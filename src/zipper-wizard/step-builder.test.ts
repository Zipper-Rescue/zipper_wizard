import { test, expect, describe } from "vitest";
import { stepBuilder, StepOption } from "@/zipper-wizard/step-builder.ts";

describe("basic steps", () => {
  const builder = stepBuilder()
    .step("first", {}, () => ({ label: "First", options }) as const)
    .step("second", {}, () => ({ label: "Second", options }) as const)
    .step("third", {}, () => ({ label: "Third", options }) as const);

  test("builds step after last data", () => {
    expect(builder.buildSteps({ first: "value" })).toEqual({
      steps: [
        { key: "first", label: "First", options },
        { key: "second", label: "Second", options },
      ],
      relevantInput: { first: "value" },
    });
  });

  test("stops building steps when prop is nullish, even when there is later data", () => {
    expect(
      builder.buildSteps({ first: undefined, second: "b", third: "c" }),
    ).toEqual({
      steps: [{ key: "first", label: "First", options }],
      relevantInput: { first: undefined },
    });
  });
});

const options: StepOption[] = [
  {
    label: "A",
    value: "a",
    imageUrl: "a.png",
  },
  {
    label: "B",
    value: "b",
    imageUrl: "b.png",
  },
  {
    label: "C",
    value: "c",
    imageUrl: "c.png",
  },
];
