import { StepInfo } from "@/zipper-wizard/step-builder.ts";

import nonSeparatingImage from "./non-separating.png";
import separatingImage from "./separating.png";
import twoWaySeparatingImage from "./two-way-separating.png";

export const zipperTypeField: StepInfo = {
  key: "type",
  label: "Zipper Type",
  options: [
    {
      label: "One-way Separating",
      value: "one-way",
      imageUrl: separatingImage,
    },
    {
      label: "Two-way Separating",
      value: "two-way",
      imageUrl: twoWaySeparatingImage,
    },
    { label: "Non-separating", value: "non-sep", imageUrl: nonSeparatingImage },
  ],
};
