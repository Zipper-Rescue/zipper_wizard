import Step from '../../wizard/Step';
import Option from '../../wizard/Option';

export default function WornOutBrokenSliderFlow() {
    return (
        <Step label="What material is your zipper slider?">
            <Option path="/coil/" link={<></>}>
                Coil.
            </Option>
            <Option path="/plastic/" link={<></>}>
                Plastic Tooth.
            </Option>
            <Option path="/metal/" link={<></>}>
                Metal Tooth.
            </Option>
        </Step>
    );
};
