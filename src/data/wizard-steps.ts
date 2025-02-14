import { stepBuilder } from "@/data/step-info.ts";

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
  );
