import { SkuItem } from "@/product-data/sku-types.ts";
import { WizardResult } from "@/zipper-wizard/wizard-steps.tsx";

export function matchSkuForWizardResult(
  result: Partial<WizardResult>,
  item: SkuItem,
): boolean {
  if (item.productType !== "slider") return false;
  if (item.sliderSize.toString() !== result.sliderSize) return false;
  if (result.toothMaterial === "coil") {
    switch (result.coilType) {
      case "standard":
        return item.toothType === "coil";
      case "reverse":
        return item.toothType === "coil-reverse";
      case "invisible":
        return item.toothType === "coil-invisible";
      default:
        return false;
    }
  } else {
    switch (result.toothMaterial) {
      case "metal":
        return item.toothType === "metal";
      case "plastic":
        return item.toothType === "plastic";
      default:
        return false;
    }
  }
}
