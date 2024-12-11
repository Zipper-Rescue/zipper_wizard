import TwoWayFlow from './flows/TwoWayFlow';
import NonSeparatingFlow from './flows/NonSeparatingFlow';
import Step from '../wizard/Step';
import Option from '../wizard/Option';

export default function ZipperWizard() {
  return (
    <Step label="What kind of zipper do you need to fix?">
      <Option path="/two_way/" link={<TwoWayFlow />}>
        Two way separating.
      </Option>
      <Option path="/non_sep/" link={<NonSeparatingFlow />}>
        Non-separating.
      </Option>
    </Step>
  );
}
