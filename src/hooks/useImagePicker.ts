import { useRef } from "react";

export function useImagePicker(gallery: string[], onGalleryChange: (gallery: string[]) => void) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const slotIndexRef = useRef<number>(0);

  // https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const updated = gallery.slice();
    updated[slotIndexRef.current] = url;
    onGalleryChange(updated);
  };

  const openPicker = (index: number) => {
    slotIndexRef.current = index;
    fileInputRef.current?.click();
  };

  return { fileInputRef, handleFileChange, openPicker };
}