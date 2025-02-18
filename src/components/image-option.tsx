import { cn } from "@/lib/util/cn.ts";
import { useEffect, useState } from "react";

export function ImageOption({
  label,
  imageUrl,
  onClick,
}: {
  label: string;
  imageUrl:
    | string
    | (() => Promise<{ default: string }>)
    | Promise<{ default: string }>;
  onClick?: () => void;
}) {
  const [resolvedImageUrl, setResolvedImageUrl] = useState<string | undefined>(
    typeof imageUrl === "string" ? imageUrl : loadingImageUrl,
  );

  useEffect(() => {
    if (typeof imageUrl !== "string") {
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
        "flex flex-col items-center",
        "border border-red-700 rounded-md",
        "overflow-hidden",
        "cursor-pointer",
        "shadow-md",
        "hover:text-blue-800 hover:border-blue-800 hover:shadow-blue-200",
        "focus:text-blue-800 focus:border-blue-800",
      )}
      onClick={() => onClick?.()}
    >
      <img src={resolvedImageUrl} alt={label} className={"w-[320px]"} />

      <div className={"py-1"}>{label}</div>
    </button>
  );
}

// svg data uri for a 320x214 grey image
const loadingImageUrl =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 214' fill='%23A0AEC0'%3E%3Crect width='100%25' height='100%25'/%3E%3C/svg%3E";
