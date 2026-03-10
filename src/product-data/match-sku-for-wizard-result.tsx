import { SkuItem, tpiMatches } from "@/product-data/sku-types.ts";
import { WizardResult } from "@/zipper-wizard/wizard-steps.tsx";

export function matchSkuForWizardResult(
  result: Partial<WizardResult>,
  item: SkuItem,
): boolean {
  if (item.productType !== "slider") return false;

  // 2-Way Slider Sets only apply to two-way separating zippers
  if (
    result.zipperType &&
    result.zipperType !== "two-way" &&
    item.label.includes("2-Way Set")
  ) {
    return false;
  }

  if (result.observedTpi) {
    const observed = parseFloat(result.observedTpi);
    if (!tpiMatches(observed, item.teethPerInch)) return false;
  }

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
