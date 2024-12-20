import Step from '../../wizard/Step';
import Option from '../../wizard/Option';
import CantFix from '../components/CantFix';
import RepairInstructions from '../components/RepairInstructions';

export default function DamageLocationFlow() {
  return (
    <Step label="Is your zipper damaged in one place or more than one place?">
      <Option path="/one_place/" link={<RepairInstructions />}>
        One Place.
      </Option>
      <Option path="/more_than_one/" link={<CantFix />}>
        More Than One.
      </Option>
    </Step>
  );
}
