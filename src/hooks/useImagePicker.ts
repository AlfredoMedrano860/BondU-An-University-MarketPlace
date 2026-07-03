import { useRef } from "react";
import type { ChangeEvent } from "react";

// https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications

/**
 * Hook para manejar la selección de imágenes desde el dispositivo.
 *
 * Usa un input de archivo oculto y un ref para rastrear el slot de la galería
 * que se está editando. Al seleccionar una imagen crea una URL temporal con
 * `URL.createObjectURL` y actualiza la galería en el índice correspondiente.
 * Usado en {@link ProductImagePicker}.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications Using files from web applications}
 *
 * @param gallery - Lista actual de URLs de imágenes.
 * @param onGalleryChange - Se ejecuta al seleccionar una imagen con la galería actualizada,
 * el archivo real seleccionado y el índice del slot (para subirlo al backend).
 * @returns `fileInputRef` — ref para el input de archivo oculto,
 * `handleFileChange` — manejador del evento onChange del input,
 * `openPicker` — abre el selector de archivos para el slot dado.
 */
export function useImagePicker(
  gallery: string[],
  onGalleryChange: (gallery: string[], file: File, slotIndex: number) => void,
) {
  const fileInputRef  = useRef<HTMLInputElement>(null);
  const slotIndexRef  = useRef<number>(0);
  const prevBlobRef   = useRef<string | null>(null);

  /**
   * Procesa el archivo seleccionado, revoca la blob URL anterior para evitar
   * memory leaks y actualiza el slot correspondiente en la galería.
   * @param e - Evento de cambio del input de archivo.
   */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (prevBlobRef.current) URL.revokeObjectURL(prevBlobRef.current);

    const url = URL.createObjectURL(file);
    prevBlobRef.current = url;

    const updated = gallery.slice();
    updated[slotIndexRef.current] = url;
    onGalleryChange(updated, file, slotIndexRef.current);
  };

  /**
   * Registra el índice del slot a editar y abre el selector de archivos.
   * @param index - Índice del slot de la galería a reemplazar.
   */
  const openPicker = (index: number) => {
    slotIndexRef.current = index;
    fileInputRef.current?.click();
  };

  return { fileInputRef, handleFileChange, openPicker };
}