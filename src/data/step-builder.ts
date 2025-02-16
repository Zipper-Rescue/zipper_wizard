export function stepBuilder<
  T extends Record<string, string> = Record<never, string>,
>(
  stepData: Array<{
    key: string;
    stepFn: (input: unknown) => Omit<StepInfo, "key">;
  }> = [],
) {
  return {
    step<TKey extends string, TStep extends Omit<StepInfo, "key">>(
      key: TKey,
      stepFn: (data: T) => TStep,
    ) {
      return stepBuilder<T & Record<TKey, TStep["options"][number]["value"]>>([
        ...stepData,
        {
          key,
          stepFn,
        },
      ] as Array<{
        key: string;
        stepFn: (input: unknown) => Omit<StepInfo, "key">;
      }>);
    },

    buildSteps(input: Partial<T>): {
      steps: StepInfo[];
      relevantInput: Partial<T>;
    } {
      const nonNullishInputKeys = Object.entries(input)
        .filter(([, value]) => value != null)
        .map(([key]) => key) as (keyof T)[];

      const lastStepIndex = stepData.findIndex(
        (step) => !nonNullishInputKeys.includes(step.key as keyof T),
      );

      const steps = stepData
        .slice(0, lastStepIndex + 1)
        .map(({ stepFn, key }) => ({
          key,
          ...stepFn(input),
        }));

      return {
        steps,
        relevantInput: Object.fromEntries(
          steps.map(({ key }) => [key, input[key]]),
        ) as Partial<T>,
      };
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
  imageUrl: string | (() => Promise<{ default: string }>);
}

export function StepInfo<T extends StepInfo>(data: T) {
  return data;
}

export type StepData<T extends StepInfo> = Record<
  T["key"],
  T["options"][number]["value"]
>;
