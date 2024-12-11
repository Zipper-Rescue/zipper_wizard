import Step from '../../wizard/Step';
import Option from '../../wizard/Option';
import TeethDamageFlow from './TeethDamageFlow';
import WornOutBrokenSliderFlow from './WornOutBrokenSliderFlow';

export default function NonSeparatingFlow() {
  return (
    <Step label="What's wrong with your zipper?">
      <Option path="/missing_damaged/" link={<TeethDamageFlow />}>
        Missing/Damaged Teeth.
      </Option>
      <Option path="/worn_out_broken_slider/" link={<WornOutBrokenSliderFlow />}>
        Worn Out/Broken Slider.
      </Option>
    </Step>
  );
}
