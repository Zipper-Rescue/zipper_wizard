import Option from "../../wizard/option.tsx";
import Step from "../../wizard/step.tsx";
import OneWayOption from "./OneWayOption";

export default function NonSepOption() {
  return (
    <Option path={"/non_sep/"} label={"Non Separating"}>
      <Step label="test13">
        <OneWayOption />
      </Step>
    </Option>
  );
}
