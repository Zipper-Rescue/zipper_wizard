export interface StepInfo {
  key: string;
  label: string;
  description?: string;

  options: Array<{
    value: string;
    label: string;
    imageUrl: string | (() => Promise<{ default: string }>);
  }>;
}

export function StepInfo<T extends StepInfo>(data: T) {
  return data;
}

export type StepData<T extends StepInfo> = Record<
  T["key"],
  T["options"][number]["value"]
>;

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

    buildSteps(input: Partial<T>): StepInfo[] {
      const inputKeys = Object.keys(input) as Array<keyof T>;
      const lastStepIndex = stepData.findIndex(
        (step) => !inputKeys.includes(step.key as keyof T),
      );

      return stepData.slice(0, lastStepIndex + 1).map(({ stepFn, key }) => ({
        key,
        ...stepFn(input),
      }));
    },
  };
}
