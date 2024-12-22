import Option from "../../wizard/Option";
import Step from "../../wizard/Step";

export default function TwoWayOption() {
  return (
    <Option path={"/two_way/"} label={"Two-way Separating"}>
      <Step>{"test"}</Step>
    </Option>
  );
}
