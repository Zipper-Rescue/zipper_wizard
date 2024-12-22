import Option from "../../wizard/Option";
import Step from "../../wizard/Step";
import OneWayOption from "./OneWayOption";

export default function TwoWayOption() {
  return (
    <Option path={"/two_way/"} label={"Two-way Separating"}>
      <Step label='test12'>
        <OneWayOption />
        <TwoWayOption />
      </Step>
    </Option>
  );
}
