import { useState } from "react";

import { Search } from "lucide-react";

import { cn } from "@/lib/util/cn";

import { Lightbox } from "./lightbox";

interface ImageWithLightboxProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageWithLightbox({
  src,
  alt,
  className,
}: ImageWithLightboxProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className="relative">
      <img src={src} alt={alt} className={className} />
      <button
        className={cn(
          "absolute top-2 right-2",
          "bg-white/90 hover:bg-white",
          "p-1.5 rounded-full",
          "shadow-md",
          "transition-colors",
        )}
        onClick={(e) => {
          e.stopPropagation();
          setIsLightboxOpen(true);
        }}
      >
        <Search className="w-4 h-4 text-gray-700" />
      </button>
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => {
          setIsLightboxOpen(false);
        }}
        imageUrl={src}
        alt={alt}
      />
    </div>
  );
}
