import { ZipperWizard } from "@/zipper-wizard/zipper-wizard.tsx";

import { WizardIntro } from "./components/wizard-intro/wizard-intro";
import { cn } from "./lib/util/cn";

export default function App() {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-20",
        // Padding top accounts for the fixed header, which will cover
        // the title of the step when it is scrolled into view.
        "pt-[100px] md:pt-[120px]",
      )}
    >
      <WizardIntro />
      <ZipperWizard />
    </div>
  );
}
