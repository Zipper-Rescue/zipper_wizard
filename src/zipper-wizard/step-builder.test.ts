import { test, expect, describe, vitest } from "vitest";

import { stepBuilder, StepOption } from "@/zipper-wizard/step-builder.ts";

const options = [{ value: "test", label: "Test", imageUrl: "test.jpg" }];

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
  const secondFn = vitest.fn((_images: object, data: { first: string }) =>
    data.first === "a" ? ({ label: "Second", options } as const) : null,
  );
  const thirdFn = vitest.fn(() => ({ label: "Third", options }) as const);

  const builder = stepBuilder()
    .step("first", {}, firstFn)
    .stepConditional("second", {}, secondFn)
    .step("third", {}, thirdFn);

  test("true", () => {
    expect(builder.buildSteps([["first", "a"]])).toEqual([
      { key: "first", label: "First", options },
      { key: "second", label: "Second", options },
    ]);
  });

  test("false", () => {
    expect(builder.buildSteps([["first", "b"]])).toEqual([
      { key: "first", label: "First", options },
      { key: "third", label: "Third", options },
    ]);
  });
});

describe("conditional step near end", () => {
  const materialFn = vitest.fn(() => ({ label: "Material", options }) as const);
  const coilTypeFn = vitest.fn((_images: object, data: { material: string }) =>
    data.material === "coil"
      ? ({ label: "Coil Type", options } as const)
      : null,
  );
  const sizeFn = vitest.fn(() => ({ label: "Size", options }) as const);
  const lastStepFn = vitest.fn(
    () => ({ label: "Results", options: [] as StepOption[] }) as const,
  );

  const builder = stepBuilder()
    .step("material", {}, materialFn)
    .stepConditional("coilType", {}, coilTypeFn)
    .step("size", {}, sizeFn)
    .step("lastStep", {}, lastStepFn);

  test("with conditional step (coil material)", () => {
    const steps = builder.buildSteps([
      ["material", "coil"],
      ["coilType", "standard"],
      ["size", "5"],
    ]);

    expect(steps).toEqual([
      { key: "material", label: "Material", options },
      { key: "coilType", label: "Coil Type", options },
      { key: "size", label: "Size", options },
      { key: "lastStep", label: "Results", options: [] },
    ]);
  });

  test("without conditional step (metal material)", () => {
    const steps = builder.buildSteps([
      ["material", "metal"],
      ["size", "5"],
    ]);

    expect(steps).toEqual([
      { key: "material", label: "Material", options },
      { key: "size", label: "Size", options },
      { key: "lastStep", label: "Results", options: [] },
    ]);
  });

  test("partial steps with conditional", () => {
    const steps = builder.buildSteps([["material", "coil"]]);

    expect(steps).toEqual([
      { key: "material", label: "Material", options },
      { key: "coilType", label: "Coil Type", options },
    ]);
  });

  test("partial steps without conditional", () => {
    const steps = builder.buildSteps([["material", "metal"]]);

    expect(steps).toEqual([
      { key: "material", label: "Material", options },
      { key: "size", label: "Size", options },
    ]);
  });
});
