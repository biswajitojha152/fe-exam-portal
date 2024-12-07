import React from "react";

import { Paper, Grid, Typography, Box } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import FolderIcon from "@mui/icons-material/Folder";
import ClassIcon from "@mui/icons-material/Class";
import FunctionsIcon from "@mui/icons-material/Functions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DangerousIcon from "@mui/icons-material/Dangerous";

import QuizTrailTable from "./QuizTrailTable";

import { useGetDashboardDataQuery } from "../../services/dashboard";

import LoadingComponent from "../../components/LoadingComponent";
import ChartComponent from "./ChartComponent";

const dashboardMenuList = [
  {
    label: "Users",
    icon: <GroupIcon sx={{ fontSize: 80 }} color="secondary" />,
    key: "numberOfUser",
  },
  {
    label: "Categories",
    icon: <FolderIcon sx={{ fontSize: 80 }} color="warning" />,
    key: "numberOfCategory",
  },
  {
    label: "Quizzes",
    icon: <ClassIcon sx={{ fontSize: 80 }} color="success" />,
    key: "numberOfQuiz",
  },
];

const dashboardSubMenuList = [
  {
    label: "Total Attempts",
    key: "totalAttempts",
    icon: <FunctionsIcon fontSize="small" sx={{ mr: 1 }} color="info" />,
    color: "info",
  },
  {
    label: "Passed Attempts",
    key: "passedAttempts",
    icon: <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} color="success" />,
    color: "success",
  },
  {
    label: "Failed Attempts",
    key: "failedAttempts",
    icon: <DangerousIcon fontSize="small" sx={{ mr: 1 }} color="error" />,
    color: "error",
  },
];

const CustomTab = React.memo(({ label, count, icon }) => {
  return (
    <Paper sx={{ display: "flex", alignItems: "center" }}>
      {icon}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          ".MuiTypography-root": {
            letterSpacing: 2,
          },
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          {label}
        </Typography>
        <Typography variant="h5" align="center">
          {count}
        </Typography>
      </Box>
    </Paper>
  );
});

const CustomTabLabel = React.memo(({ label, count, icon, color }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        ".MuiTypography-root": {
          letterSpacing: 2,
          fontWeight: 600,
        },
      }}
    >
      <Typography
        variant="body1"
        sx={{
          display: "flex",
          alignItems: "center",
          color: (theme) => theme.palette[color].main,
        }}
      >
        {icon}
        {label}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: (theme) => theme.palette[color].main,
        }}
      >
        {count}
      </Typography>
    </Box>
  );
});

const Dashboard = () => {
  const {
    data: dashboardData = {
      numberOfCategory: 0,
      numberOfQuiz: 0,
      numberOfUser: 0,
      attemptsDTO: {
        totalAttempts: 0,
        passedAttempts: 0,
        failedAttempts: 0,
      },
    },
    isLoading,
  } = useGetDashboardDataQuery();

  return (
    <React.Fragment>
      <Grid container sx={{ ".MuiPaper-root": { p: 2 } }} spacing={2}>
        {dashboardMenuList.map((menu) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={menu.label}>
              <CustomTab
                label={menu.label}
                count={dashboardData[menu.key]}
                icon={menu.icon}
              />
            </Grid>
          );
        })}
        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
          <Paper
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {dashboardSubMenuList.map((subMenu) => {
              return (
                <CustomTabLabel
                  key={subMenu.label}
                  label={subMenu.label}
                  count={dashboardData.attemptsDTO[subMenu.key]}
                  icon={subMenu.icon}
                  color={subMenu.color}
                />
              );
            })}
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} xl={7}>
            <QuizTrailTable />
          </Grid>
          <Grid item xs={12} xl={5}>
            <ChartComponent attemptsDTO={dashboardData.attemptsDTO} />
          </Grid>
        </Grid>
      </Box>
      <LoadingComponent open={isLoading} />
    </React.Fragment>
  );
};

export default Dashboard;
