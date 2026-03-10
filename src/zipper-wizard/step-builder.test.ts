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
    expect(builder.buildSteps([["first", "value"]]).steps).toEqual([
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
    expect(builder.buildSteps([["first", "a"]]).steps).toEqual([
      { key: "first", label: "First", options },
      { key: "second", label: "Second", options },
    ]);
  });

  test("false", () => {
    expect(builder.buildSteps([["first", "b"]]).steps).toEqual([
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
    const result = builder.buildSteps([
      ["material", "coil"],
      ["coilType", "standard"],
      ["size", "5"],
    ]);

    expect(result.steps).toEqual([
      { key: "material", label: "Material", options },
      { key: "coilType", label: "Coil Type", options },
      { key: "size", label: "Size", options },
      { key: "lastStep", label: "Results", options: [] },
    ]);
    expect(result.stepStatuses).toEqual(["completed", "completed"]);
  });

  test("without conditional step (metal material)", () => {
    const result = builder.buildSteps([
      ["material", "metal"],
      ["size", "5"],
    ]);

    expect(result.steps).toEqual([
      { key: "material", label: "Material", options },
      { key: "size", label: "Size", options },
      { key: "lastStep", label: "Results", options: [] },
    ]);
    expect(result.stepStatuses).toEqual(["skipped", "completed"]);
  });

  test("partial steps with conditional", () => {
    const result = builder.buildSteps([["material", "coil"]]);

    expect(result.steps).toEqual([
      { key: "material", label: "Material", options },
      { key: "coilType", label: "Coil Type", options },
    ]);
    expect(result.stepStatuses).toEqual(["current", "upcoming"]);
  });

  test("partial steps without conditional", () => {
    const result = builder.buildSteps([["material", "metal"]]);

    expect(result.steps).toEqual([
      { key: "material", label: "Material", options },
      { key: "size", label: "Size", options },
    ]);
    expect(result.stepStatuses).toEqual(["skipped", "current"]);
  });

  test("stepStatuses - at start", () => {
    const result = builder.buildSteps([]);
    expect(result.stepStatuses).toEqual(["uncertain", "upcoming"]);
  });

  test("stepStatuses - all done with coil", () => {
    const result = builder.buildSteps([
      ["material", "coil"],
      ["coilType", "standard"],
      ["size", "5"],
    ]);
    expect(result.stepStatuses).toEqual(["completed", "completed"]);
  });

  test("stepStatuses - all done without coil", () => {
    const result = builder.buildSteps([
      ["material", "metal"],
      ["size", "5"],
    ]);
    expect(result.stepStatuses).toEqual(["skipped", "completed"]);
  });
});

describe("indicatorTemplate", () => {
  const builder = stepBuilder()
    .step("intro", {}, () => ({ label: "Intro", options }))
    .step("a", {}, () => ({ label: "A", options }))
    .stepConditional("b", {}, () => ({ label: "B", options }))
    .step("c", {}, () => ({ label: "C", options }))
    .step("last", {}, () => ({ label: "Last", options: [] as StepOption[] }));

  test("returns middle steps with conditional flag", () => {
    expect(builder.indicatorTemplate).toEqual([
      { key: "a", isConditional: false },
      { key: "b", isConditional: true },
      { key: "c", isConditional: false },
    ]);
  });
});
