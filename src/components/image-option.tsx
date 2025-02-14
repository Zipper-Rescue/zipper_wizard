import { cn } from "@/lib/utils.ts";
import { useEffect, useState } from "react";

export function ImageOption({
  label,
  imageUrl,
  onClick,
}: {
  label: string;
  imageUrl: string | (() => Promise<{ default: string }>);
  onClick?: () => void;
}) {
  const [resolvedImageUrl, setResolvedImageUrl] = useState<string | undefined>(
    typeof imageUrl === "string" ? imageUrl : undefined,
  );

  useEffect(() => {
    if (typeof imageUrl === "function") {
      imageUrl().then(
        (module) => {
          setResolvedImageUrl(module.default);
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
