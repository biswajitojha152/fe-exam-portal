import React from "react";

import {
  Paper,
  Grid,
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Toolbar,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import FolderIcon from "@mui/icons-material/Folder";
import ClassIcon from "@mui/icons-material/Class";
import FunctionsIcon from "@mui/icons-material/Functions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DangerousIcon from "@mui/icons-material/Dangerous";

import LoadingComponent from "../../components/LoadingComponent";
import { useGetDashboardDataQuery } from "../../services/dashboard";

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
    key: "passAttempts",
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
        {count || 100}
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
      totalAttempts: 0,
      passAttempts: 0,
      failedAttempts: 0,
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
                  count={dashboardData[subMenu.key]}
                  icon={subMenu.icon}
                  color={subMenu.color}
                />
              );
            })}
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 5 }}>
        <Grid container>
          <Grid item xs={12} xl={7}>
            <Paper>
              <Toolbar
                sx={[
                  {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                  },
                ]}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    letterSpacing: 1,
                  }}
                >
                  Quiz Submission History
                </Typography>
              </Toolbar>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow
                      sx={{
                        ".MuiTableCell-root": {
                          fontSize: "1rem",
                          fontWeight: "bold",
                          letterSpacing: 1,
                        },
                      }}
                    >
                      <TableCell>Sl No.</TableCell>
                      <TableCell>Date & Time</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Quiz Name</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        // "& > *": { borderBottom: "unset" },
                        ".MuiTableCell-root": {
                          fontSize: "1rem",
                          letterSpacing: 1,
                        },
                      }}
                    >
                      <TableCell>item 1</TableCell>
                      <TableCell>item 2</TableCell>
                      <TableCell>item 3</TableCell>
                      <TableCell>item 4</TableCell>
                      <TableCell>item 5</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            color: "#51A037",
                            backgroundColor: "rgba(81, 160, 55, 0.1)",
                            border: `0.5px solid #51A037`,
                            textAlign: "center",
                            borderRadius: 1,
                          }}
                        >
                          Passed
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        // "& > *": { borderBottom: "unset" },
                        ".MuiTableCell-root": {
                          fontSize: "1rem",
                          letterSpacing: 1,
                        },
                      }}
                    >
                      <TableCell>item 1</TableCell>
                      <TableCell>item 2</TableCell>
                      <TableCell>item 3</TableCell>
                      <TableCell>item 4</TableCell>
                      <TableCell>item 5</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            color: "#ED1C24",
                            backgroundColor: "rgba(237, 28, 36, 0.1)",
                            border: `0.5px solid #ED1C24`,
                            textAlign: "center",
                            borderRadius: 1,
                          }}
                        >
                          Failed
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <LoadingComponent open={isLoading} />
    </React.Fragment>
  );
};

export default Dashboard;
