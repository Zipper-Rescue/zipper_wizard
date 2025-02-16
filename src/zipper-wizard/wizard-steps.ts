import { stepBuilder } from "@/zipper-wizard/step-builder.ts";

export const wizardSteps = stepBuilder()
  // ===========================================================================
  // Zipper Type
  //
  .step(
    "zipperType",
    {
      oneWaySeparatingExample: import(
        "./zipper-wizard-step-images/01-zipper-type/1-way-separating-example.jpg"
      ),
      twoWaySeparatingExample: import(
        "./zipper-wizard-step-images/01-zipper-type/2-way-separating-example.jpg"
      ),
      nonSeparatingExample: import(
        "./zipper-wizard-step-images/01-zipper-type/non-separating-example.jpg"
      ),
    },
    (images) =>
      ({
        label: "Zipper Type",
        options: [
          {
            label: "One-way Separating",
            value: "one-way",
            imageUrl: images.oneWaySeparatingExample,
          },
          {
            label: "Two-way Separating",
            value: "two-way",
            imageUrl: images.twoWaySeparatingExample,
          },
          {
            label: "Non-separating",
            value: "non-sep",
            imageUrl: images.nonSeparatingExample,
          },
        ],
      }) as const,
  )

  // ===========================================================================
  // Failure Type
  //
  .step(
    "failureType",
    {
      damagedTeeth: import(
        "./zipper-wizard-step-images/02-failure-type/damaged-teeth.png"
      ),
      missingBoxOrPin: import(
        "./zipper-wizard-step-images/02-failure-type/missing-box-or-pin.png"
      ),
      wornBrokenSlider: import(
        "./zipper-wizard-step-images/02-failure-type/worn-broken-slider.png"
      ),
    },
    (images, { zipperType }) =>
      ({
        label: "Failure Type",
        options: [
          {
            label: "Damaged Teeth",
            value: "damaged-teeth",
            imageUrl: images.damagedTeeth,
          },
          ...(zipperType !== "non-sep"
            ? [
                {
                  label: "Missing Box or Pin",
                  value: "missing-box-or-pin",
                  imageUrl: images.missingBoxOrPin,
                },
              ]
            : []),
          {
            label: "Worn or Broken Slider",
            value: "worn-broken-slider",
            imageUrl: images.wornBrokenSlider,
          },
        ],
      }) as const,
  )

  // ===========================================================================
  // Tooth type
  //

  .step(
    "toothType",
    {
      coil: import("./zipper-wizard-step-images/03-tooth-type/coil.png"),
      metal: import("./zipper-wizard-step-images/03-tooth-type/metal.png"),
      plastic: import("./zipper-wizard-step-images/03-tooth-type/plastic.png"),
    },
    (images, { failureType }) =>
      failureType === "worn-broken-slider"
        ? ({
            label: "Tooth Type",
            options: [
              {
                label: "Coil",
                value: "coil",
                imageUrl: images.coil,
              },
              {
                label: "Metal",
                value: "metal",
                imageUrl: images.metal,
              },
              {
                label: "Plastic",
                value: "plastic",
                imageUrl: images.plastic,
              },
            ],
          } as const)
        : {
            label: "Can't fix",
            description:
              "Sorry, you need to take that to a seamstress or tailor.",
            options: [],
          },
  )

  // ===========================================================================
  // Tooth count
  //

  .step(
    "toothCount",
    {
      coil324Tpi: import(
        "./zipper-wizard-step-images/04-tooth-count/coil-3_24-tpi.jpg"
      ),
      coil4520Tpi: import(
        "./zipper-wizard-step-images/04-tooth-count/coil-4.5_20-tpi.jpg"
      ),
      coil5165Tpi: import(
        "./zipper-wizard-step-images/04-tooth-count/coil-5_16.5-tpi.jpg"
      ),
      coil814Tpi: import(
        "./zipper-wizard-step-images/04-tooth-count/coil-8_14-tpi.jpg"
      ),
      coil1010Tpi: import(
        "./zipper-wizard-step-images/04-tooth-count/coil-10_10-tpi.jpg"
      ),
      metal312Tpi: import(
        "./zipper-wizard-step-images/04-tooth-count/metal-3_12-tpi.jpg"
      ),
      metal4511Tpi: import(
        "./zipper-wizard-step-images/04-tooth-count/metal-4.5_11-tpi.jpg"
      ),
      metal510Tpi: import(
        "./zipper-wizard-step-images/04-tooth-count/metal-5_10-tpi.jpg"
      ),
      metal79Tpi: import(
        "./zipper-wizard-step-images/04-tooth-count/metal-7_9-tpi.jpg"
      ),
      metal88Tpi: import(
        "./zipper-wizard-step-images/04-tooth-count/metal-8_8-tpi.jpg"
      ),
      metal107Tpi: import(
        "./zipper-wizard-step-images/04-tooth-count/metal-10_7-tpi.jpg"
      ),
      plastic310Tpi: import(
        "./zipper-wizard-step-images/04-tooth-count/plastic-3_10-tpi.jpg"
      ),
      plastic485Tpi: import(
        "./zipper-wizard-step-images/04-tooth-count/plastic-4_8.5-tpi.jpg"
      ),
      plastic575Tpi: import(
        "./zipper-wizard-step-images/04-tooth-count/plastic-5_7.5-tpi.jpg"
      ),
      plastic86Tpi: import(
        "./zipper-wizard-step-images/04-tooth-count/plastic-8_6.5-tpi.jpg"
      ),
      plastic105Tpi: import(
        "./zipper-wizard-step-images/04-tooth-count/plastic-10_5-tpi.jpg"
      ),
    },
    (images, { toothType }) =>
      toothType === "coil"
        ? ({
            label: "Tooth Count",
            options: [
              {
                label: "24 teeth per inch",
                value: "coil-3",
                imageUrl: images.coil324Tpi,
              },
              {
                label: "20 teeth per inch",
                value: "coil-4.5",
                imageUrl: images.coil4520Tpi,
              },
              {
                label: "16.5 teeth per inch",
                value: "coil-5",
                imageUrl: images.coil5165Tpi,
              },
              {
                label: "14 teeth per inch",
                value: "coil-8",
                imageUrl: images.coil814Tpi,
              },
              {
                label: "10 teeth per inch",
                value: "coil-10",
                imageUrl: images.coil1010Tpi,
              },
            ],
          } as const)
        : toothType === "metal"
          ? ({
              label: "Tooth Count",
              options: [
                {
                  label: "12 teeth per inch",
                  value: "3",
                  imageUrl: images.metal312Tpi,
                },
                {
                  label: "11 teeth per inch",
                  value: "4.5",
                  imageUrl: images.metal4511Tpi,
                },
                {
                  label: "10 teeth per inch",
                  value: "5",
                  imageUrl: images.metal510Tpi,
                },
                {
                  label: "9 teeth per inch",
                  value: "7",
                  imageUrl: images.metal79Tpi,
                },
                {
                  label: "8 teeth per inch",
                  value: "8",
                  imageUrl: images.metal88Tpi,
                },
                {
                  label: "7 teeth per inch",
                  value: "10",
                  imageUrl: images.metal107Tpi,
                },
              ],
            } as const)
          : ({
              label: "Tooth Count",
              options: [
                {
                  label: "10 teeth per inch",
                  value: "3",
                  imageUrl: images.plastic310Tpi,
                },
                {
                  label: "8.5 teeth per inch",
                  value: "4",
                  imageUrl: images.plastic485Tpi,
                },
                {
                  label: "7.5 teeth per inch",
                  value: "5",
                  imageUrl: images.plastic575Tpi,
                },
                {
                  label: "6.5 teeth per inch",
                  value: "8",
                  imageUrl: images.plastic86Tpi,
                },
                {
                  label: "5 teeth per inch",
                  value: "10",
                  imageUrl: images.plastic105Tpi,
                },
              ],
            } as const),
  );
