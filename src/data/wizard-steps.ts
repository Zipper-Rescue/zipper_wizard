import { stepBuilder } from "@/data/step-builder.ts";

export const wizardSteps = stepBuilder()
  // ===========================================================================
  // Zipper Type
  //
  .step(
    "zipperType",
    () =>
      ({
        label: "Zipper Type",
        options: [
          {
            label: "One-way Separating",
            value: "one-way",
            imageUrl: () =>
              import(
                "./zipper-wizard-step-images/01-zipper-type/1-way-separating-example.jpg"
              ),
          },
          {
            label: "Two-way Separating",
            value: "two-way",
            imageUrl: () =>
              import(
                "./zipper-wizard-step-images/01-zipper-type/2-way-separating-example.jpg"
              ),
          },
          {
            label: "Non-separating",
            value: "non-sep",
            imageUrl: () =>
              import(
                "./zipper-wizard-step-images/01-zipper-type/non-separating-example.jpg"
              ),
          },
        ],
      }) as const,
  )

  // ===========================================================================
  // Failure Type
  //
  .step(
    "failureType",
    ({ zipperType }) =>
      ({
        label: "Failure Type",
        options: [
          {
            label: "Damaged Teeth",
            value: "damaged-teeth",
            imageUrl: () =>
              import(
                "./zipper-wizard-step-images/02-failure-type/damaged-teeth.png"
              ),
          },
          ...(zipperType !== "non-sep"
            ? [
                {
                  label: "Missing Box or Pin",
                  value: "missing-box-or-pin",
                  imageUrl: () =>
                    import(
                      "./zipper-wizard-step-images/02-failure-type/missing-box-or-pin.png"
                    ),
                },
              ]
            : []),
          {
            label: "Worn or Broken Slider",
            value: "worn-broken-slider",
            imageUrl: () =>
              import(
                "./zipper-wizard-step-images/02-failure-type/worn-broken-slider.png"
              ),
          },
        ],
      }) as const,
  )

  // ===========================================================================
  // Tooth type
  //

  .step("toothType", ({ failureType }) =>
    failureType === "worn-broken-slider"
      ? ({
          label: "Tooth Type",
          options: [
            {
              label: "Coil",
              value: "coil",
              imageUrl: () =>
                import("./zipper-wizard-step-images/03-tooth-type/coil.png"),
            },
            {
              label: "Metal",
              value: "metal",
              imageUrl: () =>
                import("./zipper-wizard-step-images/03-tooth-type/metal.png"),
            },
            {
              label: "Plastic",
              value: "plastic",
              imageUrl: () =>
                import("./zipper-wizard-step-images/03-tooth-type/plastic.png"),
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

  .step("toothCount", ({ toothType }) =>
    toothType === "coil"
      ? ({
          label: "Tooth Count",
          options: [
            {
              label: "3",
              value: "3",
              imageUrl: () =>
                import(
                  "./zipper-wizard-step-images/04-tooth-count/coil-3_24-tpi.jpg"
                ),
            },
            {
              label: "4.5",
              value: "4.5",
              imageUrl: () =>
                import(
                  "./zipper-wizard-step-images/04-tooth-count/coil-4.5_20-tpi.jpg"
                ),
            },
            {
              label: "5",
              value: "5",
              imageUrl: () =>
                import(
                  "./zipper-wizard-step-images/04-tooth-count/coil-5_16.5-tpi.jpg"
                ),
            },
            {
              label: "8",
              value: "8",
              imageUrl: () =>
                import(
                  "./zipper-wizard-step-images/04-tooth-count/coil-8_14-tpi.jpg"
                ),
            },
            {
              label: "10",
              value: "10",
              imageUrl: () =>
                import(
                  "./zipper-wizard-step-images/04-tooth-count/coil-10_10-tpi.jpg"
                ),
            },
          ],
        } as const)
      : toothType === "metal"
        ? ({
            label: "Tooth Count",
            options: [
              {
                label: "3",
                value: "3",
                imageUrl: () =>
                  import(
                    "./zipper-wizard-step-images/04-tooth-count/metal-3_12-tpi.jpg"
                  ),
              },
              {
                label: "4.5",
                value: "4.5",
                imageUrl: () =>
                  import(
                    "./zipper-wizard-step-images/04-tooth-count/metal-4.5_11-tpi.jpg"
                  ),
              },
              {
                label: "5",
                value: "5",
                imageUrl: () =>
                  import(
                    "./zipper-wizard-step-images/04-tooth-count/metal-5_10-tpi.jpg"
                  ),
              },
              {
                label: "7",
                value: "7",
                imageUrl: () =>
                  import(
                    "./zipper-wizard-step-images/04-tooth-count/metal-7_9-tpi.jpg"
                  ),
              },
              {
                label: "8",
                value: "8",
                imageUrl: () =>
                  import(
                    "./zipper-wizard-step-images/04-tooth-count/metal-8_8-tpi.jpg"
                  ),
              },
              {
                label: "10",
                value: "10",
                imageUrl: () =>
                  import(
                    "./zipper-wizard-step-images/04-tooth-count/metal-10_7-tpi.jpg"
                  ),
              },
            ],
          } as const)
        : ({
            label: "Tooth Count",
            options: [
              {
                label: "3",
                value: "3",
                imageUrl: () =>
                  import(
                    "./zipper-wizard-step-images/04-tooth-count/plastic-3_10-tpi.jpg"
                  ),
              },
              {
                label: "4",
                value: "4",
                imageUrl: () =>
                  import(
                    "./zipper-wizard-step-images/04-tooth-count/plastic-4_8.5-tpi.jpg"
                  ),
              },
              {
                label: "5",
                value: "5",
                imageUrl: () =>
                  import(
                    "./zipper-wizard-step-images/04-tooth-count/plastic-5_7.5-tpi.jpg"
                  ),
              },
              {
                label: "8",
                value: "8",
                imageUrl: () =>
                  import(
                    "./zipper-wizard-step-images/04-tooth-count/plastic-8_6.5-tpi.jpg"
                  ),
              },
              {
                label: "10",
                value: "10",
                imageUrl: () =>
                  import(
                    "./zipper-wizard-step-images/04-tooth-count/plastic-10_5-tpi.jpg"
                  ),
              },
            ],
          } as const),
  );
