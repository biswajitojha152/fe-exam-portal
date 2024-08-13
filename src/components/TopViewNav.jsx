import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { Link as RouterLink } from "react-router-dom";

const TopViewNav = ({ topViewNavData }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon />}>
      {topViewNavData.navData.map((nav) => {
        return (
          <Link
            key={nav.label}
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            component={RouterLink}
            to={nav.path}
          >
            {nav.icon}
            {nav.label}
          </Link>
        );
      })}
      <Typography
        sx={{ display: "flex", alignItems: "center" }}
        color="text.primary"
      >
        {topViewNavData.data.icon}
        {topViewNavData.data.label}
      </Typography>
    </Breadcrumbs>
  );
};

export default TopViewNav;
