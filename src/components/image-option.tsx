import { useEffect, useState } from "react";

import { cn } from "@/lib/util/cn.ts";

import { ImageWithLightbox } from "./ui/image-with-lightbox";

// TODO: Zoom function

export function ImageOption({
  label,
  imageUrl,
  onClick,
  imageClass,
}: {
  label: string;
  imageUrl?:
    | string
    | (() => Promise<{ default: string }>)
    | Promise<{ default: string }>;
  onClick?: () => void;
  isSelected?: boolean;
  imageClass?: string;
}) {
  const [resolvedImageUrl, setResolvedImageUrl] = useState<string | undefined>(
    typeof imageUrl === "string"
      ? imageUrl
      : imageUrl
        ? loadingImageUrl
        : undefined,
  );

  useEffect(() => {
    if (imageUrl && typeof imageUrl !== "string") {
      const promise = typeof imageUrl === "function" ? imageUrl() : imageUrl;
      promise
        .then((module) => {
          const image = new Image();
          image.src = module.default;
          return new Promise<string>((resolve, reject) => {
            image.onload = () => {
              resolve(module.default);
            };
            image.onerror = reject;
          });
        })
        .then(
          (src) => {
            setResolvedImageUrl(src);
          },
          (error: unknown) => {
            console.error(error);
          },
        );
    }
  }, [imageUrl]);

  return (
    <button
      className={cn(
        "flex flex-col items-center justify-center",
        "border rounded-md",
        "border-primary",
        "overflow-hidden",
        "cursor-pointer",
        "shadow-md",
        "hover:text-primary hover:border-primary hover:shadow-red-200",
        "focus:text-primary focus:border-primary",
        !imageUrl && "h-full",
      )}
      onClick={() => onClick?.()}
    >
      {imageUrl && resolvedImageUrl ? (
        <>
          <ImageWithLightbox
            src={resolvedImageUrl}
            alt={label}
            className={cn("h-auto", imageClass ?? "w-[320px]")}
          />
          <div className={"py-1 px-2 font-semibold"}>{label}</div>
        </>
      ) : (
        <div
          className={cn(
            "text-xl font-medium text-center px-4 h-auto",
            imageClass,
          )}
        >
          {label}
        </div>
      )}
    </button>
  );
}

// svg data uri for a 320x214 grey image
const loadingImageUrl =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 214' fill='%23A0AEC0'%3E%3Crect width='100%25' height='100%25'/%3E%3C/svg%3E";
