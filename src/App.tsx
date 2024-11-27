import Option from "./wizard/Option";
import Step from "./wizard/Step";

const CantFix = "I'm sorry, we can't fix that";

function App() {
  return (
    <Step label={"What kind of zipper do you need to fix?"}>
      <Option
        path={"/two_way/"}
        link={
          <Step label={"What's wrong with your zipper?"}>
            <Option path={"/missing_damaged/"} link={CantFix}>
              Missing/Damaged Teeth.
            </Option>
          </Step>
        }
      >
        Two way separating.
      </Option>
      <Option path={"/non_sep/"} link={
        <Step label={"What's wrong with your zipper?"}>
          <Option path={"/missing_damaged/"} link= {
            <Step label={"Is it two-way or one-way?"}>
              <Option path={"/one_way/"} link={CantFix}>
                One Way.
              </Option>
              <Option path={"/two_way/"} link={
                <Step label={"Is your zipper damaged in one place or more than one place?"}>
                  <Option path={"/one_place/"} link={
                    <div>
                      Take a Top stop from our outdoor kit and crimp the top like this:<br/>
                      <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDZaN3DMgHm01-6C8oAIuJyc1U2k5DM9Qb1g&s'}/><br/>
                      Click <a href={"example.com"}>HERE</a> to add a top stop to your cart.
                    </div>
                  }>
                    One Place.
                  </Option>
                  <Option path={"/more_than_one/"} link={CantFix}>
                    More Than One.
                  </Option>
                </Step>
              }>
                Two Way.
              </Option>
            </Step>
          }>
            Missing/Damaged Teeth.
          </Option>
        </Step>
      }>
        Non-separating.
      </Option>
    </Step>
  );
}

export default App;
