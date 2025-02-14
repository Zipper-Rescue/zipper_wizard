import Option from "../../wizard/option.tsx";
import Step from "../../wizard/step.tsx";
import TwoWayOption from "./TwoWayOption";

export default function OneWayOption() {
  return (
    <Option path={"/one_way/"} label={"One-way Separating"}>
      <Step label="test">
        <OneWayOption />
        <TwoWayOption />
      </Step>
    </Option>
  );
}
