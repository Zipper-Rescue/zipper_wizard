import Step from "../wizard/Step";
import TwoWayOption from "./options/TwoWayOption";

export default function ZipperWizard() {
  return (
    <Step label="What kind of zipper do you need to fix?">
      <TwoWayOption />
    </Step>
  );
}
