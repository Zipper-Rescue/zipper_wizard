import Step from '../../wizard/Step';
import Option from '../../wizard/Option';
import CantFix from '../components/CantFix';
import DamageLocationFlow from './DamageLocationFlow';

export default function TeethDamageFlow() {
  return (
    <Step label="Is it two-way or one-way?">
      <Option path="/one_way/" link={<CantFix />}>
        One Way.
      </Option>
      <Option path="/two_way/" link={<DamageLocationFlow />}>
        Two Way.
      </Option>
    </Step>
  );
}