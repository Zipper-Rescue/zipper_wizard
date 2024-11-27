import Option from "./wizard/Option";
import Step from "./wizard/Step";

function App() {
  return (
    <Step label={"testttt"}>
      <Option
        path={"/test/"}
        link={
          <Step>
            <Option path={"/test0/"} link={"test0"}>
              test0
            </Option>
            <Option path={"/test1/"} link={"test1"}>
              test1
            </Option>
          </Step>
        }
      >
        test
      </Option>
      <Option path={"/test2/"} link={"test2"}>
        test2
      </Option>
    </Step>
  );
}

export default App;
