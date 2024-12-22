import Option from "../../wizard/Option";
import Step from "../../wizard/Step";
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
