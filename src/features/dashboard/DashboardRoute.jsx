import { Fragment, useMemo } from "react";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import secureStorage from "../../helper/secureStorage";
import { ADMIN, USER } from "../../helper/constants";

const DashboardRoute = () => {
  const loggedInUserRole = useMemo(
    () => secureStorage.getItem("data").role,
    []
  );
  return (
    <Fragment>
      {loggedInUserRole === ADMIN && <AdminDashboard />}
      {loggedInUserRole === USER && <UserDashboard />}
    </Fragment>
  );
};

export default DashboardRoute;
