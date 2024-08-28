import React from "react";

import { Box } from "@mui/material";
import Header from "../features/header/Header";
import SideBar from "../features/sideBar/SideBar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <React.Fragment>
      <Header />
      <Box>
        <SideBar />
        <Box
          sx={{
            p: {
              xs: 1,
              lg: 3,
            },
            marginLeft: {
              xs: "60px",
              lg: "240px",
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default UserLayout;
