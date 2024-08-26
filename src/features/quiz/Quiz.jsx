import React from "react";

import TopViewNav from "../../components/TopViewNav";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import AddIcon from "@mui/icons-material/Add";

import { useGetAllQuizQuery } from "../../services/quiz";
import { Box, Grid, Paper, Typography, IconButton } from "@mui/material";
import LoadingComponent from "../../components/LoadingComponent";
import AddQuizFormDialog from "./AddQuizFormDialog";

const topViewNavData = {
  navData: [
    {
      label: "Dashobard",
      path: "/dashboard",
      icon: <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
    },
  ],
  data: {
    label: "Quiz",
    icon: <ClassIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
  },
};

const Quiz = () => {
  const { data: quizList = [], isLoading } = useGetAllQuizQuery();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <TopViewNav topViewNavData={topViewNavData} />
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {quizList.map((quiz) => {
            return (
              <Grid item xs={12} md={4} key={quiz.id}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h5" gutterBottom>
                    {quiz.name}
                  </Typography>
                  <Typography variant="h6">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Accusamus quasi fugiat obcaecati cupiditate iusto suscipit
                    nesciunt necessitatibus voluptate? Magni, iure!
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        <IconButton
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: "white",
            position: "fixed",
            bottom: 10,
            right: 10,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.light,
            },
          }}
          size="small"
          onClick={handleOpen}
        >
          <AddIcon fontSize="large" />
        </IconButton>
      </Box>
      <AddQuizFormDialog open={open} handleClose={handleClose} />
      <LoadingComponent open={isLoading} />
    </React.Fragment>
  );
};

export default Quiz;
