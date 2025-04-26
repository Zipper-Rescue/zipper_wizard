import { AddToCartButton } from "@/components/add-to-cart-button";
import { SkuCard } from "@/components/sku-card";
import { WizardIntro } from "@/components/wizard-intro/wizard-intro";
import { matchSkuForWizardResult } from "@/product-data/match-sku-for-wizard-result";
import { skuData } from "@/product-data/sku-data.generated";
import { itemTypeRecord, ItemTypeId, SkuItem } from "@/product-data/sku-types";
import { stepBuilder } from "@/zipper-wizard/step-builder.ts";
import { StepDescription } from "@/zipper-wizard/step-description.tsx";

export const wizardSteps = stepBuilder()
  // ===========================================================================
  // Introduction
  //
  .step("introduction", {}, () => {
    return {
      description: <WizardIntro />,
      options: [
        {
          label: "Start the wizard!",
          value: "start",
          imageClass: "p-8 w-60 text-primary",
        },
      ],
    };
  })

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
        label: "Select zipper type",
        description:
          "Inspect only the end / bottom where it unzips, do not compare the tooth material.",
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
        label: "Select Failure Type",
        description: (
          <StepDescription>
            <span>
              <strong>Worn or Broken Slider</strong> is the most common and easy
              to fix! If the teeth won&apos;t stay closed it&apos;s likely a
              worn slider. This step is very important!
            </span>
          </StepDescription>
        ),

        options: [
          {
            label: "Worn or Broken Slider",
            value: "worn-broken-slider",
            imageUrl: images.wornBrokenSlider,
          },
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
        ] as const,
      }) as const,
  )

  // ===========================================================================
  // Tooth type
  //

  .step(
    "toothMaterial",
    {
      coil: import("./zipper-wizard-step-images/03-tooth-type/coil.png"),
      metal: import("./zipper-wizard-step-images/03-tooth-type/metal.png"),
      plastic: import("./zipper-wizard-step-images/03-tooth-type/plastic.png"),
    },
    (images, { failureType }) =>
      failureType === "worn-broken-slider"
        ? ({
            label: "Select tooth type",
            description: (
              <StepDescription>
                <div>Look closely at the shape of the teeth.</div>
                <div>
                  Some zippers may appear to be metal but are actually plastic.
                </div>
                <div>Coil zippers can be very small and hard to see.</div>
              </StepDescription>
            ),
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
        : ({
            label: "Can't fix",
            description:
              "Sorry, you need to take that to a seamstress or tailor.",
            options: [],
          } as const),
  )

  // ===========================================================================
  // (Conditional) Coil type (standard, reverse, invisible)
  //
  .stepConditional(
    "coilType",
    {
      standardCoil: import(
        "./zipper-wizard-step-images/04-coil-type/standard-coil.png"
      ),
      reverseCoil: import(
        "./zipper-wizard-step-images/04-coil-type/reverse-coil.png"
      ),
      invisibleCoil: import(
        "./zipper-wizard-step-images/04-coil-type/invisible-coil.png"
      ),
    },
    (images, { toothMaterial }) =>
      toothMaterial === "coil"
        ? ({
            label: "Select coil type",
            description: (
              <StepDescription>
                <ul>
                  <li>
                    <strong>Standard Coil</strong> - you&apos;ll see and feel
                    the coils on the outside
                  </li>
                  <li>
                    <strong>Reverse Coil</strong> - same as standard but the
                    coils face inwards
                  </li>
                  <li>
                    <strong>Invisible coil</strong> - not common, most often
                    found on dresses and skirts
                  </li>
                </ul>
              </StepDescription>
            ),
            options: [
              {
                label: "Standard",
                value: "standard",
                imageUrl: images.standardCoil,
              },
              {
                label: "Reverse",
                value: "reverse",
                imageUrl: images.reverseCoil,
              },
              {
                label: "Invisible",
                value: "invisible",
                imageUrl: images.invisibleCoil,
              },
            ],
          } as const)
        : null,
  )

  // ===========================================================================
  // Tooth count
  //

  .step(
    "sliderSize",
    {
      coil324Tpi: import(
        "@/zipper-wizard/zipper-wizard-step-images/05-tooth-count/coil-3_24-tpi.jpg"
      ),
      coil4520Tpi: import(
        "@/zipper-wizard/zipper-wizard-step-images/05-tooth-count/coil-4.5_20-tpi.jpg"
      ),
      coil5165Tpi: import(
        "@/zipper-wizard/zipper-wizard-step-images/05-tooth-count/coil-5_16.5-tpi.jpg"
      ),
      coil814Tpi: import(
        "@/zipper-wizard/zipper-wizard-step-images/05-tooth-count/coil-8_14-tpi.jpg"
      ),
      coil1010Tpi: import(
        "@/zipper-wizard/zipper-wizard-step-images/05-tooth-count/coil-10_10-tpi.jpg"
      ),
      metal312Tpi: import(
        "@/zipper-wizard/zipper-wizard-step-images/05-tooth-count/metal-3_12-tpi.jpg"
      ),
      metal4511Tpi: import(
        "@/zipper-wizard/zipper-wizard-step-images/05-tooth-count/metal-4.5_11-tpi.jpg"
      ),
      metal510Tpi: import(
        "@/zipper-wizard/zipper-wizard-step-images/05-tooth-count/metal-5_10-tpi.jpg"
      ),
      metal79Tpi: import(
        "@/zipper-wizard/zipper-wizard-step-images/05-tooth-count/metal-7_9-tpi.jpg"
      ),
      metal88Tpi: import(
        "@/zipper-wizard/zipper-wizard-step-images/05-tooth-count/metal-8_8-tpi.jpg"
      ),
      metal107Tpi: import(
        "@/zipper-wizard/zipper-wizard-step-images/05-tooth-count/metal-10_7-tpi.jpg"
      ),
      plastic310Tpi: import(
        "@/zipper-wizard/zipper-wizard-step-images/05-tooth-count/plastic-3_10-tpi.jpg"
      ),
      plastic485Tpi: import(
        "@/zipper-wizard/zipper-wizard-step-images/05-tooth-count/plastic-4_8.5-tpi.jpg"
      ),
      plastic575Tpi: import(
        "@/zipper-wizard/zipper-wizard-step-images/05-tooth-count/plastic-5_7.5-tpi.jpg"
      ),
      plastic86Tpi: import(
        "@/zipper-wizard/zipper-wizard-step-images/05-tooth-count/plastic-8_6.5-tpi.jpg"
      ),
      plastic105Tpi: import(
        "@/zipper-wizard/zipper-wizard-step-images/05-tooth-count/plastic-10_5-tpi.jpg"
      ),
    },
    (images, { toothMaterial }) =>
      toothMaterial === "coil"
        ? ({
            label: "Count the teeth in 1 inch",
            description: (
              <StepDescription>
                <div className="font-bold">
                  This is not always exact, select the closest match!
                </div>
                <div>Start counting midway between two teeth as shown.</div>
              </StepDescription>
            ),

            options: [
              {
                label: "24 teeth per inch",
                value: "3",
                imageUrl: images.coil324Tpi,
              },
              {
                label: "20 teeth per inch",
                value: "4.5",
                imageUrl: images.coil4520Tpi,
              },
              {
                label: "16.5 teeth per inch",
                value: "5",
                imageUrl: images.coil5165Tpi,
              },
              {
                label: "14 teeth per inch",
                value: "8",
                imageUrl: images.coil814Tpi,
              },
              {
                label: "10 teeth per inch",
                value: "10",
                imageUrl: images.coil1010Tpi,
              },
            ],
          } as const)
        : toothMaterial === "metal"
          ? ({
              label: "Count the teeth in 1 inch",
              description: (
                <StepDescription>
                  <div>
                    This is not always an exact science. Select the closest
                    match!
                  </div>
                  <div>Start midway between two teeth as shown.</div>
                </StepDescription>
              ),
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
  )

  // ===========================================================================
  // Item Type
  //

  .stepConditional(
    "itemType",
    Object.fromEntries(
      Object.entries(itemTypeRecord).map(([key, value]) => [
        key,
        value.imageFn(),
      ]),
    ) as Record<string, Promise<{ default: string }>>,
    (_, result) => {
      // Get all products that match the current criteria
      const matchingProducts: SkuItem[] = skuData.filter((it) =>
        matchSkuForWizardResult(result, it),
      );

      // If only 1 or no products match, skip this step
      if (matchingProducts.length <= 1) {
        return null;
      }

      // Get unique applicable item types from matching products
      const itemTypes = new Set<ItemTypeId>(
        matchingProducts.flatMap((product) => {
          if (product.productType === "slider") {
            return product.applicableItemTypes;
          }
          return [];
        }),
      );

      // If there's only one item type or none, skip this step
      if (itemTypes.size <= 1) {
        return null;
      }

      return {
        label: "Select Item Type",
        description: (
          <StepDescription>
            <div>Select the type of item your zipper is on.</div>
          </StepDescription>
        ),
        options: [
          ...Array.from(itemTypes).map((type) => ({
            label: itemTypeRecord[type].label,
            value: type,
            imageUrl: itemTypeRecord[type].imageFn,
            imageClass: "w-[120px] p-2",
          })),
          {
            label: "Show all",
            value: "all",
            imageClass:
              "w-[140px] min-h-[140px] flex justify-center items-center",
          },
        ],
      };
    },
  )

  // ===========================================================================
  // Refine products if multiple match
  //

  .stepConditional("selectedProductId", {}, (_, result) => {
    const products = productsForWizard(result);

    if (products.length === 1) {
      return null;
    }

    return {
      label: "Multiple matches",
      description:
        "We found more than one product that matches your criteria. Select " +
        "the one that best matches your needs.",
      options: [
        ...products.map((product) => ({
          label: product.label,
          value: String(product.productId),
          imageUrl: product.imageFn,
        })),
      ],
    };
  })

  // ===========================================================================
  // Last Step
  //

  .step("lastStep", {}, (_, result) => {
    const matchingProducts = productsForWizard(result);
    if (matchingProducts.length === 0) {
      return {
        label: "No products found",
        description: "Please try again with different criteria.",
        options: [],
      };
    }

    const product = matchingProducts[0];
    const suggestedKitId =
      product.productType === "slider" ? product.suggestedKitProductId : null;
    const suggestedKitProduct = skuData.find(
      (it) => it.productId === suggestedKitId,
    );

    return {
      label: "Congratulations!",
      description: (
        <div className="flex flex-col gap-2">
          <div>
            <em>Et volia!</em> We have what you need to fix your zipper!
          </div>
          <div className="grid grid-cols-2 gap-2">
            {suggestedKitProduct && <SkuCard sku={suggestedKitProduct} />}
            <SkuCard sku={product} />
          </div>
          <div>
            <AddToCartButton
              className="w-full"
              skus={[
                ...(suggestedKitProduct ? [suggestedKitProduct] : []),
                product,
              ]}
            />
          </div>
        </div>
      ),
      options: [],
    };
  });

function productsForWizard(wizardState: Partial<WizardResult>): SkuItem[] {
  return skuData
    .filter((it) => matchSkuForWizardResult(wizardState, it))
    .filter((it) => {
      if (!wizardState.itemType) return true;
      if (wizardState.itemType === "all") return it.productType === "slider";
      if (it.productType !== "slider") return true;

      return it.applicableItemTypes.includes(
        wizardState.itemType as ItemTypeId,
      );
    })
    .filter((it) => {
      if (!wizardState.selectedProductId) return true;
      return Number(wizardState.selectedProductId) === it.productId;
    });
}

export type WizardResult = (typeof wizardSteps)["T"];
