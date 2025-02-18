export function stepBuilder<
  T extends Record<string, string> = Record<never, string>,
>(
  stepData: Array<{
    key: string;
    images: Record<string, Promise<{ default: string }>>;
    stepFn: (
      images: Record<string, Promise<{ default: string }>>,
      input: unknown,
    ) => Omit<StepInfo, "key">;
  }> = [],
) {
  return {
    step<
      TKey extends string,
      TImages extends Record<string, Promise<{ default: string }>>,
      TStep extends Omit<StepInfo, "key">,
    >(key: TKey, images: TImages, stepFn: (images: TImages, data: T) => TStep) {
      preloadImages(Object.values(images));

      return stepBuilder<T & Record<TKey, TStep["options"][number]["value"]>>([
        ...stepData,
        {
          key,
          images,
          stepFn,
        },
      ] as Array<{
        key: string;
        images: Record<string, Promise<{ default: string }>>;
        stepFn: (
          images: Record<string, Promise<{ default: string }>>,
          input: unknown,
        ) => Omit<StepInfo, "key">;
      }>);
    },

    buildSteps(input: Array<[string, string]>): StepInfo[] {
      const inputRecord = Object.fromEntries(input);

      const lastStepIndex = stepData.findIndex(
        (step) => !(step.key in inputRecord),
      );

      return stepData
        .slice(0, lastStepIndex + 1)
        .map(({ stepFn, images, key }) => ({
          key,
          ...stepFn(images, inputRecord),
        }));
    },
  };
}

export interface StepInfo {
  key: string;
  label: string;
  description?: string;

  options: StepOption[];
}

export interface StepOption {
  value: string;
  label: string;
  imageUrl:
    | string
    | (() => Promise<{ default: string }>)
    | Promise<{ default: string }>;
}

export function StepInfo<T extends StepInfo>(data: T) {
  return data;
}

export type StepData<T extends StepInfo> = Record<
  T["key"],
  T["options"][number]["value"]
>;

function preloadImages(images: Promise<{ default: string }>[]) {
  images.forEach((image) => {
    image.then(
      ({ default: src }) => {
        const img = new Image();
        img.src = src;
      },
      (error: unknown) => {
        console.error(error);
      },
    );
  });
}
