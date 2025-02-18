import { test, expect, describe, vitest } from "vitest";
import { stepBuilder, StepOption } from "@/zipper-wizard/step-builder.ts";

describe("basic steps", () => {
  const firstFn = vitest.fn(() => ({ label: "First", options }) as const);
  const secondFn = vitest.fn(() => ({ label: "Second", options }) as const);
  const thirdFn = vitest.fn(() => ({ label: "Third", options }) as const);

  const builder = stepBuilder()
    .step("first", {}, firstFn)
    .step("second", {}, secondFn)
    .step("third", {}, thirdFn);

  test("builds step after last data", () => {
    expect(builder.buildSteps([["first", "value"]])).toEqual([
      { key: "first", label: "First", options },
      { key: "second", label: "Second", options },
    ]);
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
