import { useEffect, useState } from "react";

// svg data uri for a 320x214 grey image
const loadingImageUrl =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 214' fill='%23A0AEC0'%3E%3Crect width='100%25' height='100%25'/%3E%3C/svg%3E";

type ImageSource =
  | string
  | Promise<{ default: string }>
  | (() => Promise<{ default: string }>)
  | Promise<string>;

export function AsyncImage({
  src,
  alt,
  className,
  title,
}: {
  src: ImageSource;
  alt: string;
  className?: string;
  title?: string;
}) {
  const [resolvedSrc, setResolvedSrc] = useState<string>(loadingImageUrl);

  useEffect(() => {
    if (typeof src === "string") {
      setResolvedSrc(src);
      return;
    }

    const loadImage = async () => {
      try {
        let resolvedUrl: string;

        if (typeof src === "function") {
          const module = await src();
          resolvedUrl = module.default;
        } else {
          const result = await src;
          resolvedUrl =
            typeof result === "object" && "default" in result
              ? result.default
              : result;
        }

        // Preload the image
        const img = new Image();
        img.src = resolvedUrl;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        setResolvedSrc(resolvedUrl);
      } catch (error) {
        console.error("Failed to load image:", error);
      }
    };

    loadImage().catch((error: unknown) => {
      console.error("Failed to load image:", error);
    });
  }, [src]);

  return (
    <img src={resolvedSrc} alt={alt} className={className} title={title} />
  );
}
