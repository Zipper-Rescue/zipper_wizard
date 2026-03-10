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
      <div
        className="relative inline-block max-w-[90vw] max-h-[90vh]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img
          src={imageUrl}
          alt={alt}
          className="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain block"
        />
        <button
          className={cn(
            "absolute top-2 right-2",
            "bg-black/60 text-white hover:bg-black/80 hover:text-white",
            "p-2 rounded-full",
            "transition-colors",
            "touch-manipulation",
          )}
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
