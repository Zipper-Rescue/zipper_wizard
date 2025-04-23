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
  containedInProductIds?: number[]; // IDs of kits that include this slider
  suggestedKitProductId?: number; // ID of the suggested kit for this slider
  applicableItemTypes: ItemTypeId[]; // List of item types this slider is applicable for
}

export interface KitSku extends SkuBase {
  productType: "kit";
  label: string;
}

export interface ItemType {
  label: string;
  imageFn: () => Promise<{ default: string }>;
}

export const itemTypeRecord = {
  automotiveTops: {
    label: "Automotive Tops",
    imageFn: () =>
      import("@/product-data/item-type-images/Automotive Tops.png"),
  },
  backpacksAndBags: {
    label: "Backpacks & Bags",
    imageFn: () =>
      import("@/product-data/item-type-images/Backpacks & Bags.png"),
  },
  boatCoversAndCushions: {
    label: "Boat Covers & Cushions",
    imageFn: () =>
      import("@/product-data/item-type-images/Boat Covers & Cushions.png"),
  },
  bootsAndShoes: {
    label: "Boots & Shoes",
    imageFn: () => import("@/product-data/item-type-images/Boots & Shoes.png"),
  },
  dressesAndSkirts: {
    label: "Dresses & Skirts",
    imageFn: () =>
      import("@/product-data/item-type-images/Dresses & Skirts.png"),
  },
  jacketsAndCoats: {
    label: "Jackets & Coats",
    imageFn: () =>
      import("@/product-data/item-type-images/Jackets & Coats.png"),
  },
  luggage: {
    label: "Luggage",
    imageFn: () => import("@/product-data/item-type-images/Luggage.png"),
  },
  pantsAndShorts: {
    label: "Pants & Shorts",
    imageFn: () => import("@/product-data/item-type-images/Pants & Shorts.png"),
  },
  purses: {
    label: "Purses & Small Bags",
    imageFn: () =>
      import("@/product-data/item-type-images/Purses & Small Bags.png"),
  },
  sleepingBags: {
    label: "Sleeping Bags",
    imageFn: () => import("@/product-data/item-type-images/Sleeping Bags.png"),
  },
  tentsAndCanopies: {
    label: "Tents & Canopies",
    imageFn: () =>
      import("@/product-data/item-type-images/Tents & Canopies.png"),
  },
  wetsuitsAndLifejackets: {
    label: "Wetsuits & Lifejackets",
    imageFn: () =>
      import("@/product-data/item-type-images/Wetsuits & Lifejackets.png"),
  },
} as const;
export const itemTypes = Object.values(itemTypeRecord);
export type ItemTypeId = keyof typeof itemTypeRecord;

export type ZipperToothMaterial = "coil" | "metal" | "plastic";
export type ZipperCoilStyle = "standard" | "reverse" | "invisible";
