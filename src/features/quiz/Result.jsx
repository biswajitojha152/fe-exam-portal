import { Fragment } from "react";
import { useLocation } from "react-router-dom";

const Result = () => {
  const { state } = useLocation();
  console.log(state, "state here....");
  return <Fragment>Hello World!</Fragment>;
};

export default Result;
