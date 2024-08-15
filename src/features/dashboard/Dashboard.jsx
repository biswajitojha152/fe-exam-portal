import React from "react";

import { Paper, Grid, Typography, Box } from "@mui/material";

import usersImg from "../../img/users.png";
import categoriesImg from "../../img/categories.png";
import quizzesImg from "../../img/quizzes.png";
import LoadingComponent from "../../components/LoadingComponent";
import { useGetDashboardDataQuery } from "../../services/dashboard";

const dashboardMenuList = [
  {
    label: "Users",
    img: usersImg,
    key: "numberOfUser",
  },
  {
    label: "Categories",
    img: categoriesImg,
    key: "numberOfCategory",
  },
  {
    label: "Quizzes",
    img: quizzesImg,
    key: "numberOfQuiz",
  },
];

const Dashboard = () => {
  const {
    data: dashboardData = {
      numberOfCategory: 0,
      numberOfQuiz: 0,
      numberOfUser: 0,
    },
    isLoading,
  } = useGetDashboardDataQuery();

  return (
    <React.Fragment>
      <Grid container sx={{ ".MuiPaper-root": { p: 2 } }} spacing={2}>
        {dashboardMenuList.map((menu) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={menu.label}>
              <Paper sx={{ display: "flex" }}>
                <Box
                  component="img"
                  src={menu.img}
                  alt="users image"
                  sx={{
                    width: {
                      xs: 70,
                      lg: 100,
                    },
                  }}
                />
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h5"
                    align="center"
                    sx={{ letterSpacing: 2 }}
                    gutterBottom
                  >
                    {menu.label}
                  </Typography>
                  <Typography variant="h5" align="center">
                    {dashboardData[menu.key]}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <LoadingComponent open={isLoading} />
    </React.Fragment>
  );
};

export default Dashboard;
