import { cn } from "@/lib/utils.ts";

export function ImageOption({
  label,
  imageUrl,
  onClick,
}: {
  label: string;
  imageUrl: string;
  onClick?: () => void;
}) {
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
      <img src={imageUrl} alt={label} className={""} />

      <div className={"py-1"}>{label}</div>
    </button>
  );
}
