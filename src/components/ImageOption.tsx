import { cn } from "@/lib/utils.ts";

export function ImageOption({
  label,
  imageUrl,
  href,
}: {
  label: string;
  imageUrl: string;
  href?: string;
}) {
  return (
    <a
      className={cn(
        "flex flex-col items-center",
        "border border-red-700 rounded-md",
        "overflow-hidden",
        "cursor-pointer",
        "shadow-md",
        "hover:text-blue-800 hover:border-blue-800 hover:shadow-blue-200",
        "focus:text-blue-800 focus:border-blue-800",
      )}
      href={href ?? "javascript:void(0)"}
    >
      <img src={imageUrl} alt={label} className={""} />

      <div className={"py-1"}>{label}</div>
    </a>
  );
}
