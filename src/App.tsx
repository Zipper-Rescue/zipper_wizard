import { ZipperWizard } from "@/zipper-wizard/zipper-wizard.tsx";

import { cn } from "./lib/util/cn";

export default function App() {
  return (
    <div className={cn("flex flex-col items-center gap-20")}>
      <ZipperWizard />
    </div>
  );
}
