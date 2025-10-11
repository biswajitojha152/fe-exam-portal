import { Fragment, useMemo } from "react";

import QuizAdmin from "./QuizAdmin";
import QuizUser from "./QuizUser";

import secureStorage from "../../helper/secureStorage";
import { ADMIN, USER } from "../../helper/constants";

const QuizRouter = () => {
  const loggedInUserRole = useMemo(
    () => secureStorage.getItem("data").role,
    []
  );
  return (
    <Fragment>
      {loggedInUserRole === ADMIN && <QuizAdmin />}
      {loggedInUserRole === USER && <QuizUser />}
    </Fragment>
  );
};

export default QuizRouter;
