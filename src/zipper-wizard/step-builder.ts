import { JSX } from "react";

type StepFn<
  TImages extends Record<string, Promise<{ default: string }>> = Record<
    string,
    Promise<{ default: string }>
  >,
  TStep extends Omit<StepInfo, "key"> = Omit<StepInfo, "key">,
  TData = object,
> = (images: TImages, input: TData) => TStep | undefined | null;

type BuilderStep = {
  key: string;
  images: Record<string, Promise<{ default: string }>>;
  stepFn: StepFn;
};

export function stepBuilder<
  T extends Record<string, string> = Record<never, string>,
>(stepData: BuilderStep[] = []) {
  return {
    get T(): T {
      throw new Error("type only");
    },

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
      ] as BuilderStep[]);
    },

    stepConditional<
      TKey extends string,
      TImages extends Record<string, Promise<{ default: string }>>,
      TStep extends Omit<StepInfo, "key">,
    >(key: TKey, images: TImages, stepFn: StepFn<TImages, TStep, T>) {
      preloadImages(Object.values(images));

      return stepBuilder<
        T & Record<TKey, TStep["options"][number]["value"] | undefined>
      >([
        ...stepData,
        {
          key,
          images,
          stepFn,
        },
      ] as BuilderStep[]);
    },

    buildSteps(input: Array<[string, string]>): StepInfo[] {
      const inputRecord = Object.fromEntries(input);

      const lastStepIndex = stepData.findIndex(
        (step) => !(step.key in inputRecord),
      );

      const nextStep = stepData
        .slice(lastStepIndex)
        .map(
          ({ stepFn, images, key }) =>
            [
              key,
              stepFn(images, inputRecord as Record<string, unknown>),
            ] as const,
        )
        .find(([, step]) => step !== null);

      return [
        // Known steps
        ...stepData
          .slice(0, lastStepIndex)
          .flatMap(({ stepFn, images, key }) => {
            const result = stepFn(images, inputRecord);
            return result ? [{ key, ...result } as StepInfo] : [];
          }),

        // Find the next step that doesn't return nullish for the given input
        ...(nextStep != null
          ? [
              {
                key: nextStep[0],
                ...nextStep[1],
              } as StepInfo,
            ]
          : []),
      ];
    },
  };
}

export interface StepInfo {
  key: string;
  label: string;
  description?: string | JSX.Element;

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
