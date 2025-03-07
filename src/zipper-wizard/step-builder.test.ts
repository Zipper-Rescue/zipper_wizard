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

describe("conditional steps", () => {
  const firstFn = vitest.fn(() => ({ label: "First", options }) as const);
  const secondFn = vitest.fn(
    (_images, { first }: { first: "a" | "b" | "c" }) =>
      first === "a" ? ({ label: "Second", options } as const) : null,
  );
  const thirdFn = vitest.fn(() => ({ label: "Third", options }) as const);

  const builder = stepBuilder()
    .step("first", {}, firstFn)
    .stepConditional("second", {}, secondFn)
    .step("third", {}, thirdFn);

  test("true", () => {
    expect(builder.buildSteps([["first", "a" as const]])).toEqual([
      { key: "first", label: "First", options },
      { key: "second", label: "Second", options },
    ]);
  });

  test("false", () => {
    expect(builder.buildSteps([["first", "b" as const]])).toEqual([
      { key: "first", label: "First", options },
      { key: "third", label: "Third", options },
    ]);
  });
});

const options = [
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
] as const satisfies StepOption[];
