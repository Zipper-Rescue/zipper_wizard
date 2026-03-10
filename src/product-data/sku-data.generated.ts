import { SkuItem } from "@/product-data/sku-types.ts";

export const skuData: SkuItem[] = [
  {
    productId: 292,
    productType: "kit",
    label: "Clothing - Zipper Rescue Kit®",
    imageFn: () =>
      import("@/product-data/product-images/292_amzn-clothing-kit-page-1.jpg"),
  },

  {
    productId: 296,
    productType: "kit",
    label: "Outdoor - Zipper Rescue Kit®",
    imageFn: () =>
      import("@/product-data/product-images/296_amzn-outdoor-kit-page-1.jpg"),
  },

  {
    productId: 315,
    productType: "kit",
    label: "Moto - Zipper Rescue Kit®",
    imageFn: () =>
      import("@/product-data/product-images/315_amzn-moto-kit-page-1.jpg"),
  },

  {
    productId: 295,
    productType: "kit",
    label: "Marine - Zipper Rescue Kit®",
    imageFn: () =>
      import("@/product-data/product-images/295_amzn-marine-kit-page-1.jpg"),
  },

  {
    productId: 297,
    productType: "slider",
    label: "#4 Plastic Tooth Slider - (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/297_plastic-tooth_4mm_vs_locking_slider_measurements.jpg"
      ),
    toothType: "plastic",
    sliderSize: 4,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 8.5,
    applicableItemTypes: ["jacketsAndCoats"],
    containedInProductIds: undefined,
    suggestedKitProductId: 292,
  },

  {
    productId: 298,
    productType: "slider",
    label: "#8 Plastic Tooth Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/298_plastic-tooth_8mm_locking_slider_measurements.jpg"
      ),
    toothType: "plastic",
    sliderSize: 8,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 6.5,
    applicableItemTypes: ["bootsAndShoes", "jacketsAndCoats"],
    containedInProductIds: [315],
    suggestedKitProductId: 315,
  },

  {
    productId: 299,
    productType: "slider",
    label: "#8 Metal Tooth Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/299_metal-tooth_8mm_locking_slider_measurements.jpg"
      ),
    toothType: "metal",
    sliderSize: 8,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 8,
    applicableItemTypes: ["bootsAndShoes", "jacketsAndCoats"],
    containedInProductIds: [315],
    suggestedKitProductId: 315,
  },

  {
    productId: 300,
    productType: "slider",
    label: "#7 Metal Tooth Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/300_metal-tooth_7mm_locking_slider_measurements.jpg"
      ),
    toothType: "metal",
    sliderSize: 7,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 9,
    applicableItemTypes: ["jacketsAndCoats"],
    containedInProductIds: [315],
    suggestedKitProductId: 315,
  },

  {
    productId: 301,
    productType: "slider",
    label: "#3 Metal Tooth Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/301_metal-tooth_3mm_locking_slider_measurements.jpg"
      ),
    toothType: "metal",
    sliderSize: 3,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 12,
    applicableItemTypes: [
      "dressesAndSkirts",
      "jacketsAndCoats",
      "pantsAndShorts",
      "purses",
    ],
    containedInProductIds: undefined,
    suggestedKitProductId: 292,
  },

  {
    productId: 302,
    productType: "slider",
    label: "#10 Coil Slider",
    imageFn: () =>
      import(
        "@/product-data/product-images/302_coil_10mm_slider_measurements.jpg"
      ),
    toothType: "coil",
    sliderSize: 10,
    pullStyle: "single",
    lockingType: "non-locking",
    teethPerInch: 10,
    applicableItemTypes: [
      "automotiveTops",
      "backpacksAndBags",
      "boatCoversAndCushions",
      "luggage",
      "tentsAndCanopies",
    ],
    containedInProductIds: undefined,
    suggestedKitProductId: 296,
  },

  {
    productId: 303,
    productType: "slider",
    label: "#10 Coil Slider - Double Pull",
    imageFn: () =>
      import(
        "@/product-data/product-images/303_coil_10mm_double-pull_slider_measurements.jpg"
      ),
    toothType: "coil",
    sliderSize: 10,
    pullStyle: "double",
    lockingType: "non-locking",
    teethPerInch: 10,
    applicableItemTypes: [
      "boatCoversAndCushions",
      "sleepingBags",
      "tentsAndCanopies",
    ],
    containedInProductIds: undefined,
    suggestedKitProductId: 296,
  },

  {
    productId: 304,
    productType: "slider",
    label: "#10 Metal Tooth Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/304_metal-tooth_10mm_locking_slider_measurements.jpg"
      ),
    toothType: "metal",
    sliderSize: 10,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 7,
    applicableItemTypes: ["jacketsAndCoats"],
    containedInProductIds: [315],
    suggestedKitProductId: 315,
  },

  {
    productId: 356,
    productType: "slider",
    label: "#4.5 Coil Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/356_coil_4.5mm_locking_slider_measurements.jpg"
      ),
    toothType: "coil",
    sliderSize: 4.5,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 20,
    applicableItemTypes: ["jacketsAndCoats", "pantsAndShorts"],
    containedInProductIds: undefined,
    suggestedKitProductId: 292,
  },

  {
    productId: 361,
    productType: "slider",
    label: "#5 Reverse Coil Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/361_reverse_coil_5mm_locking_slider_measurements.jpg"
      ),
    toothType: "coil-reverse",
    sliderSize: 5,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: { min: 14, max: 15 },
    applicableItemTypes: ["bootsAndShoes", "jacketsAndCoats", "pantsAndShorts"],
    containedInProductIds: [292],
    suggestedKitProductId: 292,
  },

  {
    productId: 364,
    productType: "slider",
    label: "#5 Coil Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/364_coil_5mm_locking_slider_measurements.jpg"
      ),
    toothType: "coil",
    sliderSize: 5,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 16.5,
    applicableItemTypes: [
      "bootsAndShoes",
      "jacketsAndCoats",
      "pantsAndShorts",
      "purses",
    ],
    containedInProductIds: [292],
    suggestedKitProductId: 292,
  },

  {
    productId: 366,
    productType: "slider",
    label: "#10 Plastic Tooth Slider - Double Pull (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/366_plastic-tooth_10mm_double-pull_locking_slider_measurements_2.jpg"
      ),
    toothType: "plastic",
    sliderSize: 10,
    pullStyle: "double",
    lockingType: "locking",
    teethPerInch: 5,
    applicableItemTypes: ["boatCoversAndCushions", "tentsAndCanopies"],
    containedInProductIds: [295],
    suggestedKitProductId: 295,
  },

  {
    productId: 375,
    productType: "slider",
    label: "#3 Plastic Tooth Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/375_plastic-tooth_3mm_vs_locking_slider_measurements.jpg"
      ),
    toothType: "plastic",
    sliderSize: 3,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 10,
    applicableItemTypes: ["jacketsAndCoats"],
    containedInProductIds: [292],
    suggestedKitProductId: 292,
  },

  {
    productId: 376,
    productType: "slider",
    label: "#3 Coil Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/376_coil_3mm_locking_slider_measurements.jpg"
      ),
    toothType: "coil",
    sliderSize: 3,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 24,
    applicableItemTypes: [
      "dressesAndSkirts",
      "jacketsAndCoats",
      "pantsAndShorts",
      "purses",
    ],
    containedInProductIds: [292],
    suggestedKitProductId: 292,
  },

  {
    productId: 377,
    productType: "slider",
    label: "#4.5 Metal Tooth Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/377_metal-tooth_4.5mm_locking_slider_measurements.jpg"
      ),
    toothType: "metal",
    sliderSize: 4.5,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 11,
    applicableItemTypes: ["pantsAndShorts"],
    containedInProductIds: [292],
    suggestedKitProductId: 292,
  },

  {
    productId: 378,
    productType: "slider",
    label: "#5 Metal Tooth Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/378_metal-tooth_5mm_locking_slider_measurements.jpg"
      ),
    toothType: "metal",
    sliderSize: 5,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 10,
    applicableItemTypes: ["bootsAndShoes", "jacketsAndCoats", "purses"],
    containedInProductIds: [292],
    suggestedKitProductId: 292,
  },

  {
    productId: 379,
    productType: "slider",
    label: "#5 Coil Slider (Plastic)",
    imageFn: () =>
      import(
        "@/product-data/product-images/379_coil_5mm_plastic_slider_measurements.jpg"
      ),
    toothType: "coil",
    sliderSize: 5,
    pullStyle: "single",
    lockingType: "non-locking",
    teethPerInch: 16.5,
    applicableItemTypes: ["boatCoversAndCushions"],
    containedInProductIds: [295],
    suggestedKitProductId: 295,
  },

  {
    productId: 380,
    productType: "slider",
    label: "#5 Plastic Tooth Slider (Plastic, Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/380_plastic-tooth_5mm_vs_plastic_locking_slider_measurements.jpg"
      ),
    toothType: "plastic",
    sliderSize: 5,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 7.5,
    applicableItemTypes: ["boatCoversAndCushions", "wetsuitsAndLifejackets"],
    containedInProductIds: [295],
    suggestedKitProductId: 295,
  },

  {
    productId: 381,
    productType: "slider",
    label: "#8 Plastic Tooth Slider - Double Pull",
    imageFn: () =>
      import(
        "@/product-data/product-images/381_plastic-tooth_8mm_double-pull_slider_measurements.jpg"
      ),
    toothType: "plastic",
    sliderSize: 8,
    pullStyle: "double",
    lockingType: "non-locking",
    teethPerInch: 6.5,
    applicableItemTypes: ["boatCoversAndCushions", "tentsAndCanopies"],
    containedInProductIds: [295],
    suggestedKitProductId: 295,
  },

  {
    productId: 382,
    productType: "slider",
    label: "#10 Plastic Tooth Slider (Plastic)",
    imageFn: () =>
      import(
        "@/product-data/product-images/382_plastic-tooth_10mm_plastic_locking_slider_measurements.jpg"
      ),
    toothType: "plastic",
    sliderSize: 10,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 5,
    applicableItemTypes: ["boatCoversAndCushions", "wetsuitsAndLifejackets"],
    containedInProductIds: [295],
    suggestedKitProductId: 295,
  },

  {
    productId: 383,
    productType: "slider",
    label: "#4.5 Coil Slider - Double Pull",
    imageFn: () =>
      import(
        "@/product-data/product-images/383_coil_4.5mm_double-pull_slider_measurements.jpg"
      ),
    toothType: "coil",
    sliderSize: 4.5,
    pullStyle: "double",
    lockingType: "non-locking",
    teethPerInch: 20,
    applicableItemTypes: ["sleepingBags", "tentsAndCanopies"],
    containedInProductIds: [296],
    suggestedKitProductId: 296,
  },

  {
    productId: 384,
    productType: "slider",
    label: "#4.5 Coil Slider",
    imageFn: () =>
      import(
        "@/product-data/product-images/384_coil_4.5mm_slider_measurements.jpg"
      ),
    toothType: "coil",
    sliderSize: 4.5,
    pullStyle: "single",
    lockingType: "non-locking",
    teethPerInch: 20,
    applicableItemTypes: ["backpacksAndBags", "luggage", "purses"],
    containedInProductIds: [296],
    suggestedKitProductId: 296,
  },

  {
    productId: 385,
    productType: "slider",
    label: "#5 Coil Slider - Double Pull",
    imageFn: () =>
      import(
        "@/product-data/product-images/385_coil_5mm_double-pull_slider_measurements.jpg"
      ),
    toothType: "coil",
    sliderSize: 5,
    pullStyle: "double",
    lockingType: "non-locking",
    teethPerInch: 16.5,
    applicableItemTypes: ["sleepingBags", "tentsAndCanopies"],
    containedInProductIds: [296],
    suggestedKitProductId: 296,
  },

  {
    productId: 386,
    productType: "slider",
    label: "#5 Coil Slider",
    imageFn: () =>
      import(
        "@/product-data/product-images/386_coil_5mm_slider_measurements.jpg"
      ),
    toothType: "coil",
    sliderSize: 5,
    pullStyle: "single",
    lockingType: "non-locking",
    teethPerInch: 16.5,
    applicableItemTypes: ["backpacksAndBags", "luggage"],
    containedInProductIds: [296],
    suggestedKitProductId: 296,
  },

  {
    productId: 387,
    productType: "slider",
    label: "#5 Plastic Tooth Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/387_plastic-tooth_5mm_locking_slider_measurements.jpg"
      ),
    toothType: "plastic",
    sliderSize: 5,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 7.5,
    applicableItemTypes: ["bootsAndShoes", "jacketsAndCoats"],
    containedInProductIds: [292],
    suggestedKitProductId: 292,
  },

  {
    productId: 388,
    productType: "slider",
    label: "#8 Coil Slider",
    imageFn: () =>
      import(
        "@/product-data/product-images/388_coil_8mm_slider_measurements.jpg"
      ),
    toothType: "coil",
    sliderSize: 8,
    pullStyle: "single",
    lockingType: "non-locking",
    teethPerInch: 14,
    applicableItemTypes: ["backpacksAndBags", "luggage"],
    containedInProductIds: [296],
    suggestedKitProductId: 296,
  },

  {
    productId: 389,
    productType: "slider",
    label: "#8 Coil Slider - Double Pull",
    imageFn: () =>
      import(
        "@/product-data/product-images/389_coil_8mm_double-pull_slider_measurements.jpg"
      ),
    toothType: "coil",
    sliderSize: 8,
    pullStyle: "double",
    lockingType: "non-locking",
    teethPerInch: 14,
    applicableItemTypes: ["sleepingBags", "tentsAndCanopies"],
    containedInProductIds: [296],
    suggestedKitProductId: 296,
  },

  {
    productId: 1514,
    productType: "slider",
    label: "#3 Coil Slider - Double Pull",
    imageFn: () =>
      import(
        "@/product-data/product-images/1514_coil_3mm_double-pull_slider_measurements.jpg"
      ),
    toothType: "coil",
    sliderSize: 3,
    pullStyle: "double",
    lockingType: "non-locking",
    teethPerInch: 24,
    applicableItemTypes: ["sleepingBags", "tentsAndCanopies"],
    containedInProductIds: [296],
    suggestedKitProductId: 296,
  },

  {
    productId: 1515,
    productType: "slider",
    label: "#5 Plastic Tooth Slider - Double Pull",
    imageFn: () =>
      import(
        "@/product-data/product-images/1515_plastic-tooth_5mm_double-pull_slider_measurements.jpg"
      ),
    toothType: "plastic",
    sliderSize: 5,
    pullStyle: "double",
    lockingType: "non-locking",
    teethPerInch: 7.5,
    applicableItemTypes: ["sleepingBags", "tentsAndCanopies"],
    containedInProductIds: undefined,
    suggestedKitProductId: 296,
  },

  {
    productId: 1516,
    productType: "slider",
    label: "#5 Plastic Tooth Slider (Locking) (VS)",
    imageFn: () =>
      import(
        "@/product-data/product-images/1516_plastic-tooth_5mm_vs_locking_slider_measurements.jpg"
      ),
    toothType: "plastic",
    sliderSize: 5,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 7.5,
    applicableItemTypes: ["bootsAndShoes", "jacketsAndCoats"],
    containedInProductIds: undefined,
    suggestedKitProductId: 292,
  },

  {
    productId: 1517,
    productType: "slider",
    label: "#10 Plastic Tooth Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/1517_plastic-tooth_10mm_locking_slider_measurements.jpg"
      ),
    toothType: "plastic",
    sliderSize: 10,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 5,
    applicableItemTypes: [
      "automotiveTops",
      "boatCoversAndCushions",
      "jacketsAndCoats",
      "wetsuitsAndLifejackets",
    ],
    containedInProductIds: undefined,
    suggestedKitProductId: 295,
  },

  {
    productId: 1518,
    productType: "slider",
    label: "#10 Plastic Tooth Slider - 2-Way Set (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/1518_plastic-tooth_10mm_2-way-set_locking_slider_measurements.jpg"
      ),
    toothType: "plastic",
    sliderSize: 10,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 5,
    applicableItemTypes: ["boatCoversAndCushions", "jacketsAndCoats"],
    containedInProductIds: undefined,
    suggestedKitProductId: 295,
  },

  {
    productId: 2265,
    productType: "slider",
    label: "#8 Reverse Coil Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/2265_reverse_coil_8mm_locking_slider_measurements.jpg"
      ),
    toothType: "coil-reverse",
    sliderSize: 8,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: { min: 13, max: 14 },
    applicableItemTypes: ["bootsAndShoes", "jacketsAndCoats", "pantsAndShorts"],
    containedInProductIds: undefined,
    suggestedKitProductId: 292,
  },

  {
    productId: 2266,
    productType: "slider",
    label: "#3 Reverse Coil Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/2266_reverse_coil_3mm_locking_slider_measurements.jpg"
      ),
    toothType: "coil-reverse",
    sliderSize: 3,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: { min: 20, max: 24 },
    applicableItemTypes: [
      "dressesAndSkirts",
      "jacketsAndCoats",
      "pantsAndShorts",
      "purses",
    ],
    containedInProductIds: undefined,
    suggestedKitProductId: 292,
  },

  {
    productId: 2267,
    productType: "slider",
    label: "#5 Reverse Coil Slider",
    imageFn: () =>
      import(
        "@/product-data/product-images/2267_reverse_coil_5mm_slider_measurements.jpg"
      ),
    toothType: "coil-reverse",
    sliderSize: 5,
    pullStyle: "single",
    lockingType: "non-locking",
    teethPerInch: { min: 14, max: 15 },
    applicableItemTypes: ["backpacksAndBags", "luggage"],
    containedInProductIds: undefined,
    suggestedKitProductId: 296,
  },

  {
    productId: 2271,
    productType: "slider",
    label: "#8 VS Plastic Tooth Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/2271_plastic-tooth_8mm_vs_locking_slider_measurements.jpg"
      ),
    toothType: "plastic",
    sliderSize: 8,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 6.5,
    applicableItemTypes: ["bootsAndShoes", "jacketsAndCoats"],
    containedInProductIds: undefined,
    suggestedKitProductId: 315,
  },

  {
    productId: 2272,
    productType: "slider",
    label: "#8 VS Plastic Tooth Slider - 2-Way Set (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/2272_plastic-tooth_8mm_vs_2-way-set_locking_slider_measurements.jpg"
      ),
    toothType: "plastic",
    sliderSize: 8,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 6.5,
    applicableItemTypes: ["jacketsAndCoats"],
    containedInProductIds: undefined,
    suggestedKitProductId: 292,
  },

  {
    productId: 2274,
    productType: "slider",
    label: "#8 Plastic Tooth Slider - 2-Way Set (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/2274_plastic-tooth_8mm_2-way-set_locking_slider_measurements.jpg"
      ),
    toothType: "plastic",
    sliderSize: 8,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 6.5,
    applicableItemTypes: ["jacketsAndCoats"],
    containedInProductIds: undefined,
    suggestedKitProductId: 292,
  },

  {
    productId: 2363,
    productType: "slider",
    label: "#5 Plastic Tooth Slider - 2-Way Set (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/2363_plastic-tooth_5mm_v_2-way-set_locking_slider_measurements.jpg"
      ),
    toothType: "plastic",
    sliderSize: 5,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 7.5,
    applicableItemTypes: ["jacketsAndCoats"],
    containedInProductIds: undefined,
    suggestedKitProductId: 292,
  },

  {
    productId: 9251,
    productType: "slider",
    label: "#5VS Plastic Tooth Slider - 2-Way Set (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/9251_plastic-tooth_5mm_vs_2-way-set_locking_slider_measurements.jpg"
      ),
    toothType: "plastic",
    sliderSize: 5,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 7.5,
    applicableItemTypes: ["jacketsAndCoats"],
    containedInProductIds: undefined,
    suggestedKitProductId: 292,
  },

  {
    productId: 9244,
    productType: "slider",
    label: "#8 Coil Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/9244_coil_8mm_locking_slider_measurements.jpg"
      ),
    toothType: "coil",
    sliderSize: 8,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 14,
    applicableItemTypes: ["bootsAndShoes", "jacketsAndCoats", "pantsAndShorts"],
    containedInProductIds: undefined,
    suggestedKitProductId: 292,
  },

  {
    productId: 2273,
    productType: "slider",
    label: "#8 Reverse Coil Slider",
    imageFn: () =>
      import(
        "@/product-data/product-images/2273_reverse_coil_8mm_slider_measurements.jpg"
      ),
    toothType: "coil-reverse",
    sliderSize: 8,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: { min: 13, max: 14 },
    applicableItemTypes: [
      "automotiveTops",
      "backpacksAndBags",
      "boatCoversAndCushions",
      "luggage",
      "tentsAndCanopies",
    ],
    containedInProductIds: undefined,
    suggestedKitProductId: 296,
  },

  {
    productId: 9426,
    productType: "slider",
    label: "#10 Reverse Coil Slider",
    imageFn: () =>
      import(
        "@/product-data/product-images/9426_reverse_coil_10mm_slider_measurements.jpg"
      ),
    toothType: "coil-reverse",
    sliderSize: 10,
    pullStyle: "single",
    lockingType: "non-locking",
    teethPerInch: 10,
    applicableItemTypes: [
      "automotiveTops",
      "backpacksAndBags",
      "boatCoversAndCushions",
      "luggage",
      "tentsAndCanopies",
    ],
    containedInProductIds: undefined,
    suggestedKitProductId: 296,
  },

  {
    productId: 9425,
    productType: "slider",
    label: "#3 Reverse Coil Slider",
    imageFn: () =>
      import(
        "@/product-data/product-images/9425_reverse_coil_3mm_slider_measurements.jpg"
      ),
    toothType: "coil-reverse",
    sliderSize: 3,
    pullStyle: "single",
    lockingType: "non-locking",
    teethPerInch: { min: 20, max: 24 },
    applicableItemTypes: [
      "automotiveTops",
      "backpacksAndBags",
      "luggage",
      "purses",
    ],
    containedInProductIds: undefined,
    suggestedKitProductId: 292,
  },

  {
    productId: 9422,
    productType: "slider",
    label: "#3 Coil Slider",
    imageFn: () =>
      import(
        "@/product-data/product-images/9422_coil_3mm_slider_measurements.jpg"
      ),
    toothType: "coil",
    sliderSize: 3,
    pullStyle: "single",
    lockingType: "non-locking",
    teethPerInch: 24,
    applicableItemTypes: [
      "automotiveTops",
      "backpacksAndBags",
      "boatCoversAndCushions",
      "luggage",
      "tentsAndCanopies",
    ],
    containedInProductIds: undefined,
    suggestedKitProductId: 296,
  },

  {
    productId: 9423,
    productType: "slider",
    label: "#10 Coil Slider (Locking)",
    imageFn: () =>
      import(
        "@/product-data/product-images/9423_coil_10mm_locking_slider_measurements.jpg"
      ),
    toothType: "coil",
    sliderSize: 10,
    pullStyle: "single",
    lockingType: "locking",
    teethPerInch: 10,
    applicableItemTypes: ["bootsAndShoes", "jacketsAndCoats"],
    containedInProductIds: undefined,
    suggestedKitProductId: 292,
  },
];
