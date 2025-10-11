import { Fragment, Suspense } from "react";

import { Box } from "@mui/material";
import Header from "../features/header/Header";
import SideBar from "../features/sideBar/SideBar";

import { Outlet } from "react-router-dom";

import LoadingComponent from "../components/LoadingComponent";

const UserLayout = () => {
  return (
    <Fragment>
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
          <Suspense fallback={<LoadingComponent open={true} />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Fragment>
  );
};

export default UserLayout;
