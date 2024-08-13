import React from "react";

import TopViewNav from "../../components/TopViewNav";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";

const topViewNavData = {
  navData: [
    {
      label: "Dashobard",
      path: "/dashboard",
      icon: <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
    },
  ],
  data: {
    label: "Quiz",
    icon: <ClassIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
  },
};

const Quiz = () => {
  return (
    <React.Fragment>
      <TopViewNav topViewNavData={topViewNavData} />
    </React.Fragment>
  );
};

export default Quiz;
