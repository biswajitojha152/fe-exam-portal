import React from "react";

import { Box } from "@mui/material";
import Header from "../features/header/Header";
import SideBar from "../features/sideBar/SideBar";

import { Outlet } from "react-router-dom";

import LoadingComponent from "../components/LoadingComponent";

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
          <React.Suspense fallback={<LoadingComponent open={true} />}>
            <Outlet />
          </React.Suspense>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default UserLayout;
