import React from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";

import TopViewNav from "../../components/TopViewNav";

const topViewNavData = {
  navData: [
    {
      label: "Dashobard",
      path: "/dashboard",
      icon: <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
    },
  ],
  data: {
    label: "Category",
    icon: <FolderIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
  },
};

const Category = () => {
  return (
    <React.Fragment>
      <TopViewNav topViewNavData={topViewNavData} />
    </React.Fragment>
  );
};

export default Category;
