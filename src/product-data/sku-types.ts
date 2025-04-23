export type SkuItem = StopSku | SliderSku | KitSku;

export interface SkuBase {
  productId: number;
  productType: "slider" | "stop" | "kit";
  label: string;
  imageFn: () => Promise<{ default: string }>;
}

export interface StopSku extends SkuBase {
  productType: "stop";
  label: string;
}

export interface SliderSku extends SkuBase {
  label: string;
  productType: "slider";
  sliderSize: number;
  pullStyle: "single" | "double";
  lockingType: "locking" | "non-locking";
  toothType: "coil" | "coil-reverse" | "coil-invisible" | "metal" | "plastic";
  teethPerInch: number;
}

export interface KitSku extends SkuBase {
  productType: "kit";
  label: string;
  containedSkus: SkuItem[];
  imageFn: () => Promise<{ default: string }>;
}

export type ZipperToothType =
  | "coil"
  | "coil-reverse"
  | "coil-invisible"
  | "metal"
  | "plastic";
export type ZipperToothMaterial = "coil" | "metal" | "plastic";
export type ZipperCoilStyle = "standard" | "reverse" | "invisible";
