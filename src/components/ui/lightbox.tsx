import { useEffect } from "react";

import { X } from "lucide-react";

import { cn } from "@/lib/util/cn";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
}

export function Lightbox({ isOpen, onClose, imageUrl, alt }: LightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        "bg-black/80",
        "flex items-center justify-center",
        "p-4",
      )}
      onClick={onClose}
    >
      <button
        className={cn(
          "absolute top-4 right-4",
          "text-white hover:text-gray-300",
          "p-2 rounded-full",
          "transition-colors",
        )}
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>
      <img
        src={imageUrl}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] object-contain"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </div>
  );
}
