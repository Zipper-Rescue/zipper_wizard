# Design

## Scope of Work

Replace the current dynamic step indicator (where conditional steps are appended
at the end and the total changes as steps are resolved) with a fixed-position
template indicator. All 7 indicator-worthy steps are shown at their real
positions from the start. Conditional steps appear as dashed circles in-place.
When skipped, they stay in-place with a faint "skipped" visual (dash instead of
number). The total never changes and positions never shift.

## File Structure

```
src/
├── zipper-wizard/
│   ├── step-builder.ts             # UPDATE: expose indicatorTemplate, replace remaining counts with stepStatuses
│   ├── step-builder.test.ts        # UPDATE: test indicatorTemplate and stepStatuses
│   └── zipper-wizard.tsx           # UPDATE: pass statuses to FieldStep instead of counts
└── components/
    ├── step-indicator.tsx           # UPDATE: render from StepStatus[] instead of counts
    └── field-step.tsx              # UPDATE: pass statuses array instead of 3 separate number props
```

## Conceptual Architecture

```
                  stepBuilder
                      |
          +-----------+-----------+
          |                       |
  indicatorTemplate         buildSteps(input)
  (fixed, 7 entries)        (returns steps + stepStatuses[])
          |                       |
          |    +------------------+
          |    |
          v    v
     ZipperWizard
          |
          | statuses: StepStatus[]
          v
       FieldStep
          |
          v
     StepIndicator
     (renders 7 fixed circles from statuses array)
```

### Wizard step order (in `wizard-steps.tsx`)

9 steps defined via `stepBuilder()`:

| Index | Key                | Type        | Indicator? |
|-------|--------------------|-------------|------------|
| 0     | introduction       | required    | No (intro) |
| 1     | zipperType         | required    | Yes: pos 1 |
| 2     | failureType        | required    | Yes: pos 2 |
| 3     | toothMaterial      | required    | Yes: pos 3 |
| 4     | coilType           | conditional | Yes: pos 4 |
| 5     | observedTpi        | required    | Yes: pos 5 |
| 6     | itemType           | conditional | Yes: pos 6 |
| 7     | selectedProductId  | conditional | Yes: pos 7 |
| 8     | lastStep           | required    | No (terminal, empty options) |

### StepStatus type

```typescript
type StepStatus = 'completed' | 'current' | 'upcoming' | 'uncertain' | 'skipped';
```

### Status derivation logic (computed in buildSteps)

Find the current step's position in the indicator template (the "frontier"):

- Before frontier + in steps array → `completed`
- Before frontier + NOT in steps array → `skipped`
- At frontier → `current`
- After frontier + required → `upcoming`
- After frontier + conditional → `uncertain`

### Visual mapping in StepIndicator

| Status      | Circle                                       | Content |
|-------------|----------------------------------------------|---------|
| completed   | `bg-primary text-primary-foreground`          | number  |
| current     | `border-2 border-primary text-primary`       | number  |
| upcoming    | `border-2 border-primary text-primary`       | number  |
| uncertain   | `border-2 border-dashed border-primary/40`   | number  |
| skipped     | `border-2 border-dashed border-primary/20`   | `—`     |

### Line logic

A connector line is:
- Solid (`bg-primary`) if the step after the line is `completed`, `current`, or `skipped`
- Outlined (`border border-primary`) if the step after it is `upcoming`
- Dashed faint (`border-dashed border-primary/40`) if the step after it is `uncertain`

### Design decisions

- **Q1 (skipped visual):** Faint full-size circle with a dash inside
  (`border-primary/20 text-primary/20`, content is `—`). Keeps spacing stable.
- **Q2 (lines near skipped):** Solid lines where the flow has progressed past.
  The faded circle is enough to indicate "this was optional and not needed."

# Phases

## Phase 1: Extend step-builder with indicator template and step statuses

### Scope of phase

Add `indicatorTemplate` getter and replace `remainingRequiredCount` /
`remainingConditionalCount` in `BuildStepsResult` with a `stepStatuses` array.
Update existing tests and add new ones for the template and statuses.

### Code Organization Reminders

- Prefer a granular file structure, one concept per file.
- Place more abstract things, entry points, and tests **first**
- Place helper utility functions **at the bottom** of files.
- Keep related functionality grouped together
- Any temporary code should have a TODO comment so we can find it later.

### Implementation Details

#### 1. Add `StepStatus` type and update `BuildStepsResult` in `step-builder.ts`

```typescript
export type StepStatus = 'completed' | 'current' | 'upcoming' | 'uncertain' | 'skipped';

export interface BuildStepsResult {
  steps: StepInfo[];
  stepStatuses: StepStatus[];
}
```

Remove `remainingRequiredCount` and `remainingConditionalCount`.

#### 2. Add `indicatorTemplate` getter

Exposes the indicator-worthy steps (everything except first and last in
`stepData`), in order, with their key and conditional flag:

```typescript
get indicatorTemplate(): Array<{ key: string; isConditional: boolean }> {
  return stepData.slice(1, -1).map((s) => ({
    key: s.key,
    isConditional: s.isConditional,
  }));
},
```

#### 3. Compute `stepStatuses` inside `buildSteps`

After computing `steps` (the existing logic, unchanged), derive statuses
from the indicator template:

```typescript
const template = stepData.slice(1, -1);
const builtStepKeys = new Set(steps.map((s) => s.key));

const currentStepKey = nextStep?.[0];
const frontierIndex = currentStepKey
  ? template.findIndex((t) => t.key === currentStepKey)
  : template.length; // all resolved

const stepStatuses: StepStatus[] = template.map((t, i) => {
  if (i < frontierIndex) {
    return builtStepKeys.has(t.key) ? 'completed' : 'skipped';
  }
  if (i === frontierIndex) {
    return 'current';
  }
  return t.isConditional ? 'uncertain' : 'upcoming';
});
```

`nextStep` already exists in the current `buildSteps` code — it's the next
unanswered step found by scanning forward from `lastStepIndex`.

#### 4. Update tests in `step-builder.test.ts`

Update all existing `.remainingRequiredCount` / `.remainingConditionalCount`
assertions to use `.stepStatuses` instead.

Add a new test block for `indicatorTemplate`:

```typescript
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
```

Add status tests for the "conditional step near end" builder:

```typescript
test("stepStatuses - at start", () => {
  const result = builder.buildSteps([]);
  expect(result.stepStatuses).toEqual(["current", "uncertain", "upcoming", "upcoming"]);
});

test("stepStatuses - coil selected, at coilType", () => {
  const result = builder.buildSteps([["material", "coil"]]);
  expect(result.stepStatuses).toEqual(["completed", "current", "upcoming", "upcoming"]);
});

test("stepStatuses - metal selected, coilType skipped", () => {
  const result = builder.buildSteps([["material", "metal"]]);
  expect(result.stepStatuses).toEqual(["completed", "skipped", "current", "upcoming"]);
});

test("stepStatuses - all done with coil", () => {
  const result = builder.buildSteps([
    ["material", "coil"],
    ["coilType", "standard"],
    ["size", "5"],
  ]);
  expect(result.stepStatuses).toEqual(["completed", "completed", "completed", "completed"]);
});

test("stepStatuses - all done without coil", () => {
  const result = builder.buildSteps([
    ["material", "metal"],
    ["size", "5"],
  ]);
  expect(result.stepStatuses).toEqual(["completed", "skipped", "completed", "completed"]);
});
```

Note: the "conditional step near end" builder has 4 steps:
`material(req), coilType(cond), size(req), lastStep(req)`. The template is
`material, coilType, size` (3 entries) — but wait, the template slices off
first AND last, so it's `coilType, size` (2 entries)... No — the builder
is `material, coilType, size, lastStep`. Template = `slice(1, -1)` =
`[coilType, size]`. That's only 2 entries.

But `material` is a real indicator step. The issue is that `slice(1, -1)`
assumes the first step is always "intro" and the last is always "terminal."
In the test, `material` is the first step and IS an indicator step.

This means the template logic must be aware of which steps are intro/terminal
rather than just slicing by position. Two options:

**(A)** Mark intro and terminal steps explicitly in the builder (e.g. a
`role` field or separate method like `.introStep()` / `.terminalStep()`).

**(B)** Keep `slice(1, -1)` and accept that the test builders need to match
the real wizard structure (always have an intro and terminal step).

Go with **(B)** — the test builders in "conditional step near end" already
have `material` as a pseudo-intro and `lastStep` as terminal. The template
for that builder is `[coilType, size]` which has 2 entries. Adjust the
status test expectations accordingly:

```typescript
test("stepStatuses - at start (material is current, excluded from template)", () => {
  const result = builder.buildSteps([]);
  // Template: [coilType(cond), size(req)]
  // Current step is "material" which is NOT in the template → frontier = template.length
  // Wait — "material" is index 0 in stepData, not in the template.
  // nextStep when input is [] → first step: "material". "material" is not in the template.
  // frontierIndex = -1 (not found). Need to handle this.
});
```

Hmm, this reveals a subtlety. When the current step is NOT in the template
(it's the intro or terminal step), `frontierIndex` will be -1. Handle this:

- If `frontierIndex === -1` and the current step is BEFORE the template
  (intro): all template positions are `upcoming` or `uncertain`.
- If `frontierIndex === -1` and the current step is AFTER the template
  (terminal) or there is no next step: all template positions are
  `completed` or `skipped`.

Detect which case by checking if the current step's index in `stepData` is
before or after the template range:

```typescript
const currentStepDataIndex = currentStepKey
  ? stepData.findIndex((s) => s.key === currentStepKey)
  : stepData.length;
const isBeforeTemplate = currentStepDataIndex <= 0;
const isAfterTemplate = currentStepDataIndex >= stepData.length - 1;

const stepStatuses: StepStatus[] = template.map((t, i) => {
  if (frontierIndex >= 0) {
    if (i < frontierIndex) {
      return builtStepKeys.has(t.key) ? 'completed' : 'skipped';
    }
    if (i === frontierIndex) {
      return 'current';
    }
    return t.isConditional ? 'uncertain' : 'upcoming';
  }
  if (isBeforeTemplate) {
    return t.isConditional ? 'uncertain' : 'upcoming';
  }
  // After template (terminal or all done)
  return builtStepKeys.has(t.key) ? 'completed' : 'skipped';
});
```

Updated test expectations for "conditional step near end"
(template = `[coilType, size]`):

```typescript
test("stepStatuses - at start", () => {
  // Current step is "material" (intro, before template)
  const result = builder.buildSteps([]);
  expect(result.stepStatuses).toEqual(["uncertain", "upcoming"]);
});

test("stepStatuses - coil selected, at coilType", () => {
  const result = builder.buildSteps([["material", "coil"]]);
  // frontierIndex = 0 (coilType)
  expect(result.stepStatuses).toEqual(["current", "upcoming"]);
});

test("stepStatuses - metal selected, coilType skipped", () => {
  const result = builder.buildSteps([["material", "metal"]]);
  // Current step is "size", frontierIndex = 1
  expect(result.stepStatuses).toEqual(["skipped", "current"]);
});

test("stepStatuses - all done with coil", () => {
  const result = builder.buildSteps([
    ["material", "coil"],
    ["coilType", "standard"],
    ["size", "5"],
  ]);
  // Current step is "lastStep" (terminal, after template)
  expect(result.stepStatuses).toEqual(["completed", "completed"]);
});

test("stepStatuses - all done without coil", () => {
  const result = builder.buildSteps([
    ["material", "metal"],
    ["size", "5"],
  ]);
  // Current step is "lastStep" (terminal, after template)
  expect(result.stepStatuses).toEqual(["skipped", "completed"]);
});
```

### Validate

```bash
npx vitest run
```

All existing tests pass (with updated assertions). New template and status
tests pass.

---

## Phase 2: Update StepIndicator to render from statuses array

### Scope of phase

Replace the `totalSteps` / `currentStep` / `uncertainCount` props with a
single `statuses: StepStatus[]` prop. Render each circle and connector line
based on the status at that position.

### Code Organization Reminders

- Prefer a granular file structure, one concept per file.
- Place more abstract things, entry points, and tests **first**
- Place helper utility functions **at the bottom** of files.
- Keep related functionality grouped together
- Any temporary code should have a TODO comment so we can find it later.

### Implementation Details

#### 1. Update `step-indicator.tsx`

New props:

```typescript
import { StepStatus } from "@/zipper-wizard/step-builder.ts";

export function StepIndicator({
  statuses,
}: {
  statuses: StepStatus[];
}) {
```

Render logic:

```typescript
return (
  <div className="flex items-center justify-center gap-0 mt-2">
    {statuses.map((status, i) => {
      const stepNumber = i + 1;
      const nextStatus = statuses[i + 1];

      // Line is solid when the flow has reached the next position
      const nextReached = nextStatus === 'completed'
        || nextStatus === 'current'
        || nextStatus === 'skipped';

      return (
        <div key={stepNumber} className="flex items-center flex-1 max-w-12">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
              status === 'completed' && "bg-primary text-primary-foreground",
              (status === 'current' || status === 'upcoming') &&
                "border-2 border-primary text-primary",
              status === 'uncertain' &&
                "border-2 border-dashed border-primary/40 text-primary/40",
              status === 'skipped' &&
                "border-2 border-dashed border-primary/20 text-primary/20",
            )}
          >
            {status === 'skipped' ? '—' : stepNumber}
          </div>
          {i < statuses.length - 1 && (
            <div
              className={cn(
                "flex-1 h-0.5 min-w-2 mx-0.5",
                nextReached
                  ? "bg-primary"
                  : nextStatus === 'uncertain'
                    ? "border border-dashed border-primary/40"
                    : "border border-primary",
              )}
            />
          )}
        </div>
      );
    })}
  </div>
);
```

### Validate

```bash
npx vitest run
```

Component compiles. No test regressions. (StepIndicator has no unit tests
of its own — it's validated visually in Phase 4.)

---

## Phase 3: Update ZipperWizard and FieldStep to use statuses

### Scope of phase

Replace the per-step `stepIndex` / `totalSteps` / `uncertainCount`
computation in `zipper-wizard.tsx` with passing the `stepStatuses` array.
Simplify `field-step.tsx` to accept a single `statuses` prop.

### Code Organization Reminders

- Prefer a granular file structure, one concept per file.
- Place more abstract things, entry points, and tests **first**
- Place helper utility functions **at the bottom** of files.
- Keep related functionality grouped together
- Any temporary code should have a TODO comment so we can find it later.

### Implementation Details

#### 1. Update `field-step.tsx`

Replace `stepIndex`, `totalSteps`, `uncertainCount` with a single prop:

```typescript
import { StepStatus } from "@/zipper-wizard/step-builder.ts";

export function FieldStep({
  fieldData,
  onDataChanged,
  selectedValue,
  stepStatuses,
}: {
  fieldData: StepInfo;
  onDataChanged?: (key: string, value: string) => void;
  selectedValue?: string;
  stepStatuses?: StepStatus[];
}) {
  const indicator = stepStatuses ? (
    <StepIndicator statuses={stepStatuses} />
  ) : undefined;
  // ... rest unchanged
```

#### 2. Update `zipper-wizard.tsx`

The statuses array comes directly from `buildSteps`. The wizard just needs
to decide which steps get the indicator (skip intro and dead-end steps):

```typescript
export function ZipperWizard() {
  const [currentData, setCurrentData] = useState<Array<[string, string]>>([]);

  const { steps, stepStatuses } = wizardSteps.buildSteps(currentData);

  return (
    <div className="flex flex-col gap-20 pb-[320px]">
      {steps.map((step, index) => {
        const showIndicator = index > 0 && step.options.length > 0;
        return (
          <FieldStep
            fieldData={step}
            key={step.key}
            selectedValue={currentData[index]?.[1]}
            stepStatuses={showIndicator ? stepStatuses : undefined}
            onDataChanged={(key, value) => {
              setCurrentData([...currentData.slice(0, index), [key, value]]);
            }}
          />
        );
      })}
    </div>
  );
}
```

This is dramatically simpler than the current code. The `indicatorSteps`
filtering, `Map` construction, and per-step count arithmetic are all gone.

### Validate

```bash
npx vitest run
```

All tests pass. No lint errors.

---

## Phase 4: Cleanup & validation

### Cleanup & validation

Grep the git diff for any temporary code, TODOs, debug prints, etc.
Remove them.

```bash
npx vitest run
npx eslint src/zipper-wizard/step-builder.ts src/zipper-wizard/zipper-wizard.tsx src/components/step-indicator.tsx src/components/field-step.tsx
```

Fix all warnings, errors, and formatting issues.

Verify visually in the dev server or Storybook that:

- The indicator always shows 7 circles from the first real step
- Conditional positions (4, 6, 7) start dashed
- Choosing coil makes position 4 go solid; choosing metal makes it faded with a dash
- Completed steps fill orange; current step is outlined; lines behave correctly
- Dead-end screens (damaged teeth, missing box/pin) show no indicator

### Plan cleanup

Move remaining notes to the bottom of the plan file under `# Notes`.
Move the plan file to `docs/plans-done/`.

### Commit

```
feat(ui): fixed-position step progress indicator

- Step indicator shows all 7 positions from the start in their real order
- Conditional steps (coilType, itemType, selectedProductId) shown as dashed circles at their actual positions
- Skipped conditionals stay in place with faded dash visual instead of disappearing
- Positions and total never change, giving stable sense of progress
- step-builder exposes indicatorTemplate and stepStatuses in buildSteps result
```

# Notes

- When the current step is not in the template (intro or terminal), `frontierIndex` is -1. We use `isBeforeTemplate` to distinguish: before → all `upcoming`/`uncertain`; after → all `completed`/`skipped`.
- The indicator is only shown when `index > 0 && step.options.length > 0`, so intro and dead-end screens (damaged teeth, missing box/pin) do not display it.
