import React from "react";

import Box from "@mui/material/Box";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import UserListTable from "./UsersListTable";

import TopViewNav from "../../components/TopViewNav";

const Users = () => {
  const topViewNavData = React.useMemo(
    () => ({
      navData: [
        {
          label: "Dashobard",
          path: "/dashboard",
          icon: <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
        },
      ],
      data: {
        label: "Users",
        icon: <PeopleAltIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
      },
    }),
    []
  );
  return (
    <React.Fragment>
      <TopViewNav topViewNavData={topViewNavData} />
      <Box sx={{ mt: 2 }}>
        <UserListTable />
      </Box>
    </React.Fragment>
  );
};

export default Users;
