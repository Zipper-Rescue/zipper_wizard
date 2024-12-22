import Option from "../../wizard/Option";
import Step from "../../wizard/Step";
import OneWayOption from "./OneWayOption";

export default function NonSepOption() {
  return (
    <Option path={"/non_sep/"} label={"Non Separating"}>
      <Step label='test13'>
        <OneWayOption />
      </Step>
    </Option>
  );
}