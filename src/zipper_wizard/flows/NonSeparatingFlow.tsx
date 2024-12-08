import Step from '../../wizard/Step';
import Option from '../../wizard/Option';
import TeethDamageFlow from './TeethDamageFlow';

export default function NonSeparatingFlow() {
  return (
    <Step label="What's wrong with your zipper?">
      <Option path="/missing_damaged/" link={<TeethDamageFlow />}>
        Missing/Damaged Teeth.
      </Option>
    </Step>
  );
}