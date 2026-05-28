import { useRef } from "react";

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
 * @param onGalleryChange - Se ejecuta al seleccionar una imagen con la galería actualizada.
 * @returns `fileInputRef` — ref para el input de archivo oculto,
 * `handleFileChange` — manejador del evento onChange del input,
 * `openPicker` — abre el selector de archivos para el slot dado.
 */
export function useImagePicker(gallery: string[], onGalleryChange: (gallery: string[]) => void) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const slotIndexRef = useRef<number>(0);

  /**
   * Procesa el archivo seleccionado y actualiza el slot correspondiente en la galería.
   * @param e - Evento de cambio del input de archivo.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const updated = gallery.slice();
    updated[slotIndexRef.current] = url;
    onGalleryChange(updated);
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