import React from "react";

import { Box, Paper, Typography, Grid } from "@mui/material";

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

const categoryList = [
  {
    name: "Programming",
    count: 10,
  },
  {
    name: "General Knowlege",
    count: 10,
  },
  {
    name: "Politics",
    count: 10,
  },
];

const Category = () => {
  return (
    <React.Fragment>
      <TopViewNav topViewNavData={topViewNavData} />
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={1}>
          {categoryList.map((category) => {
            return (
              <Grid item xs={12} sm={6} md={3} xl={2} key={category.name}>
                <Paper
                  sx={{
                    p: {
                      xs: 1,
                      md: 2,
                    },
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    {category.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.warning.main,
                      fontWeight: "bold",
                    }}
                  >
                    {category.count}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Category;
