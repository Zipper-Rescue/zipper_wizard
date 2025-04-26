import { cn } from "@/lib/util/cn.ts";
import { SkuItem, itemTypeRecord } from "@/product-data/sku-types.ts";

import { AsyncImage } from "./async-image.tsx";

export function SkuCard({
  sku,
  onClick,
  isSelected,
  children,
}: {
  sku: SkuItem;
  onClick?: () => void;
  isSelected?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col",
        "max-w-[320px]",
        "border rounded-lg",
        "overflow-hidden",
        "transition-all duration-200",
        "hover:shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-red-500",
        isSelected
          ? "border-red-600 bg-red-50 shadow-md"
          : "border-gray-200 bg-white hover:border-red-200",
      )}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[320/214] bg-gray-100">
        <AsyncImage
          src={sku.imageFn}
          alt={sku.label}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col gap-2 flex-grow w-full">
        {/* Title */}
        <h3 className={cn("font-medium text-gray-900")}>{sku.label}</h3>

        {/* SKU Details */}
        {sku.productType === "slider" && (
          <div
            className={cn(
              "flex flex-wrap text-sm text-gray-600",
              "grid-cols-2",
            )}
          >
            {sku.applicableItemTypes.map((itemType) => (
              <div
                key={itemType}
                className={cn("rounded-md bg-white p-1", "w-10 h-10")}
              >
                <AsyncImage
                  src={itemTypeRecord[itemType].imageFn}
                  alt={itemTypeRecord[itemType].label}
                  className="w-full h-full object-contain"
                  title={itemTypeRecord[itemType].label}
                />
              </div>
            ))}
          </div>
        )}

        {/* Push children to bottom */}
        <div className="flex-grow" />

        {children}
      </div>
    </button>
  );
}
