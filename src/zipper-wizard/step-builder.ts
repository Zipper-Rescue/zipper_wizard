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
  isConditional: boolean;
};

export function stepBuilder<
  T extends Record<string, string> = Record<never, string>,
>(stepData: BuilderStep[] = []) {
  return {
    get T(): T {
      throw new Error("type only");
    },

    get indicatorTemplate(): Array<{ key: string; isConditional: boolean }> {
      return stepData.slice(1, -1).map((s) => ({
        key: s.key,
        isConditional: s.isConditional,
      }));
    },

    step<
      TKey extends string,
      TImages extends Record<string, Promise<{ default: string }>>,
      TStep extends Omit<StepInfo, "key">,
    >(key: TKey, images: TImages, stepFn: (images: TImages, data: T) => TStep) {
      preloadImages(Object.values(images));

      // ensure the name is unique
      if (stepData.some((step) => step.key === key)) {
        throw new Error(`Step with key "${key}" already exists`);
      }

      return stepBuilder<T & Record<TKey, TStep["options"][number]["value"]>>([
        ...stepData,
        {
          key,
          images,
          stepFn,
          isConditional: false,
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
          isConditional: true,
        },
      ] as BuilderStep[]);
    },

    buildSteps(input: Array<[string, string]>): BuildStepsResult {
      const inputRecord = Object.fromEntries(input);

      const inputKeys = input.map(([key]) => key);
      const lastStepIndex =
        stepData.findLastIndex((step) => inputKeys.includes(step.key)) + 1;

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

      const steps: StepInfo[] = [
        ...stepData
          .slice(0, lastStepIndex)
          .flatMap(({ stepFn, images, key }) => {
            const result = stepFn(images, inputRecord);
            return result ? [{ key, ...result } as StepInfo] : [];
          }),

        ...(nextStep != null
          ? [
              {
                key: nextStep[0],
                ...nextStep[1],
              } as StepInfo,
            ]
          : []),
      ];

      const template = stepData.slice(1, -1);
      const builtStepKeys = new Set(steps.map((s) => s.key));
      const currentStepKey = nextStep?.[0];
      const frontierIndex = currentStepKey
        ? template.findIndex((t) => t.key === currentStepKey)
        : -1;
      const currentStepDataIndex = currentStepKey
        ? stepData.findIndex((s) => s.key === currentStepKey)
        : stepData.length;
      const isBeforeTemplate = currentStepDataIndex <= 0;

      const stepStatuses: StepStatus[] = template.map((t, i) => {
        if (frontierIndex >= 0) {
          if (i < frontierIndex) {
            return builtStepKeys.has(t.key) ? "completed" : "skipped";
          }
          if (i === frontierIndex) {
            return "current";
          }
          return t.isConditional ? "uncertain" : "upcoming";
        }
        if (isBeforeTemplate) {
          return t.isConditional ? "uncertain" : "upcoming";
        }
        return builtStepKeys.has(t.key) ? "completed" : "skipped";
      });

      return { steps, stepStatuses };
    },
  };
}

export type StepStatus =
  | "completed"
  | "current"
  | "upcoming"
  | "uncertain"
  | "skipped";

export interface BuildStepsResult {
  steps: StepInfo[];
  stepStatuses: StepStatus[];
}

export interface StepInfo {
  key: string;
  label?: string | JSX.Element;
  description?: string | JSX.Element;

  imageWidth?: string;
  options: StepOption[];
}

export interface StepOption {
  value: string;
  label: string;
  imageWidth?: string;
  imageUrl?:
    | string
    | (() => Promise<{ default: string }>)
    | Promise<{ default: string }>;
  imageClass?: string;
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
