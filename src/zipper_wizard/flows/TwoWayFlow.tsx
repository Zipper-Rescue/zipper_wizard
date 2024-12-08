import Step from '../../wizard/Step';
import Option from '../../wizard/Option';
import CantFix from '../components/CantFix';

export default function TwoWayFlow() {
  return (
    <Step label="What's wrong with your zipper?">
      <Option path="/missing_damaged/" link={<CantFix />}>
        Missing/Damaged Teeth.
      </Option>
    </Step>
  );
}