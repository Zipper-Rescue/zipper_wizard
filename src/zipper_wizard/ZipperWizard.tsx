import Step from "../wizard/Step";
import NonSepOption from "./options/NonSepOption";
import OneWayOption from "./options/OneWayOption";
import TwoWayOption from "./options/TwoWayOption";

export default function ZipperWizard() {
  return (
    <Step label="What kind of zipper do you need to fix?">
      <OneWayOption />
      <TwoWayOption />
      <NonSepOption />
    </Step>
  );
}
