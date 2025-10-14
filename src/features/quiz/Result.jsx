import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import ResultProgressRing from "./ResultProgressRing";

const Result = () => {
  const { state } = useLocation();
  console.log(state, "state here....");
  return (
    <Fragment>
      Hello World!
      <ResultProgressRing percentage={80} status="pass" />
    </Fragment>
  );
};

export default Result;
