import { test, expect, describe, vitest } from "vitest";

import {
  computeStepStatuses,
  stepBuilder,
  StepOption,
} from "@/zipper-wizard/step-builder.ts";

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
    expect(
      builder.buildSteps([
        ["material", "coil"],
        ["coilType", "standard"],
        ["size", "5"],
      ]),
    ).toEqual([
      { key: "material", label: "Material", options },
      { key: "coilType", label: "Coil Type", options },
      { key: "size", label: "Size", options },
      { key: "lastStep", label: "Results", options: [] },
    ]);
  });

  test("without conditional step (metal material)", () => {
    expect(
      builder.buildSteps([
        ["material", "metal"],
        ["size", "5"],
      ]),
    ).toEqual([
      { key: "material", label: "Material", options },
      { key: "size", label: "Size", options },
      { key: "lastStep", label: "Results", options: [] },
    ]);
  });

  test("partial steps with conditional", () => {
    expect(builder.buildSteps([["material", "coil"]])).toEqual([
      { key: "material", label: "Material", options },
      { key: "coilType", label: "Coil Type", options },
    ]);
  });

  test("partial steps without conditional", () => {
    expect(builder.buildSteps([["material", "metal"]])).toEqual([
      { key: "material", label: "Material", options },
      { key: "size", label: "Size", options },
    ]);
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

describe("computeStepStatuses", () => {
  // Template: [coilType(cond), size(req)] — matching the "conditional step
  // near end" builder (material=intro, lastStep=terminal, sliced off)
  const template = [
    { key: "coilType", isConditional: true },
    { key: "size", isConditional: false },
  ];

  test("before template (intro is current)", () => {
    expect(
      computeStepStatuses(template, new Set(["material"]), "material"),
    ).toEqual(["uncertain", "upcoming"]);
  });

  test("coil selected, at coilType", () => {
    expect(
      computeStepStatuses(
        template,
        new Set(["material", "coilType"]),
        "coilType",
      ),
    ).toEqual(["current", "upcoming"]);
  });

  test("metal selected, coilType skipped, at size", () => {
    expect(
      computeStepStatuses(template, new Set(["material", "size"]), "size"),
    ).toEqual(["skipped", "current"]);
  });

  test("all done with coil (terminal is current)", () => {
    expect(
      computeStepStatuses(
        template,
        new Set(["material", "coilType", "size", "lastStep"]),
        "lastStep",
      ),
    ).toEqual(["completed", "completed"]);
  });

  test("all done without coil (terminal is current)", () => {
    expect(
      computeStepStatuses(
        template,
        new Set(["material", "size", "lastStep"]),
        "lastStep",
      ),
    ).toEqual(["skipped", "completed"]);
  });

  test("fog of war - step 1 only sees itself as current", () => {
    expect(
      computeStepStatuses(template, new Set(["coilType"]), "coilType"),
    ).toEqual(["current", "upcoming"]);
  });

  test("fog of war - step 2 sees step 1 completed", () => {
    expect(
      computeStepStatuses(template, new Set(["coilType", "size"]), "size"),
    ).toEqual(["completed", "current"]);
  });
});
