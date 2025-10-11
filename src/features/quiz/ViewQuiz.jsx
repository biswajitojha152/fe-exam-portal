import React from "react";
import { Box, Divider, Grid, lighten, Paper, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import QuizIcon from "@mui/icons-material/Quiz";

import TopViewNav from "../../components/TopViewNav";
import SnackAlert from "../../components/SnackAlert";
import LoadingComponent from "../../components/LoadingComponent";

import { useParams } from "react-router-dom";

import { useGetAllQuestionsQuery } from "../../services/quiz";
import AddQuestionForm from "./AddQuestionForm";
import { toLetters } from "../../helper/helper";
import RichTextEditor from "./RichTextEditor";

const ViewQuiz = () => {
  const { quizId } = useParams("quizId");
  const {
    data: quiz = {
      name: "",
      questionDTOList: [],
    },
    isLoading,
  } = useGetAllQuestionsQuery(quizId, {
    skip: !Boolean(quizId),
  });
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const topViewNavData = React.useMemo(
    () => ({
      navData: [
        {
          label: "Dashobard",
          path: "/dashboard",
          icon: <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
        },
        {
          label: "Quiz",
          path: "/quiz",
          icon: <ClassIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
        },
      ],
      data: {
        label: quiz.name,
        icon: <QuizIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
      },
    }),
    [quiz.name]
  );

  return (
    <React.Fragment>
      <TopViewNav topViewNavData={topViewNavData} />
      <Box sx={{ mt: 2 }}>
        <RichTextEditor />
        <AddQuestionForm />
        <Box
          sx={{
            my: 2,
            ".MuiBox-root": {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1,
              borderRadius: 2,
            },
            ".MuiTypography-root": {
              // fontWeight: "bold",
              letterSpacing: 1,
            },
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={3} lg={2.4}>
              <Box
                sx={{
                  border: (theme) => `2px solid ${theme.palette.info.light}`,
                  color: (theme) => theme.palette.info.light,
                  backgroundColor: (theme) =>
                    lighten(theme.palette.info.light, 0.9),
                }}
              >
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">10</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2.4}>
              <Box
                sx={{
                  border: (theme) => `2px solid ${theme.palette.success.light}`,
                  color: (theme) => theme.palette.success.light,
                  backgroundColor: (theme) =>
                    lighten(theme.palette.success.light, 0.9),
                }}
              >
                <Typography variant="h6">Active</Typography>
                <Typography variant="h6">10</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2.4}>
              <Box
                sx={{
                  border: (theme) => `2px solid ${theme.palette.error.light}`,
                  color: (theme) => theme.palette.error.light,
                  backgroundColor: (theme) =>
                    lighten(theme.palette.error.light, 0.9),
                }}
              >
                <Typography variant="h6">InActive</Typography>
                <Typography variant="h6">10</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2.4}>
              <Box
                sx={{
                  border: (theme) => `2px solid ${theme.palette.primary.light}`,
                  color: (theme) => theme.palette.primary.light,
                  backgroundColor: (theme) =>
                    lighten(theme.palette.primary.light, 0.9),
                }}
              >
                <Typography variant="h6">Attemptable</Typography>
                <Typography variant="h6">10</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2.4}>
              <Box
                sx={{
                  border: (theme) => `2px solid ${theme.palette.warning.light}`,
                  color: (theme) => theme.palette.warning.light,
                  backgroundColor: (theme) =>
                    lighten(theme.palette.warning.light, 0.9),
                }}
              >
                <Typography variant="h6">Time</Typography>
                <Typography variant="h6">1hr 30min</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {quiz.questionDTOList.map((question, index) => {
          return (
            <Paper key={question.id} sx={{ my: 1, p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                }}
              >
                <Box>
                  <Typography>{`Q${index + 1})`}</Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ mb: 2, whiteSpace: "pre-wrap" }}>
                    {question.name}
                  </Typography>
                  <Grid container spacing={2}>
                    {question.optionDTOList.map((option, index) => {
                      return (
                        <Grid item xs={6} key={option.id}>
                          <Typography
                            sx={{ color: option.isCorrect ? "green" : "red" }}
                          >
                            <span style={{ marginRight: 10 }}>{`${toLetters(
                              index + 1
                            )})`}</span>
                            {option.name}
                          </Typography>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Box>
              {/* <Divider sx={{ my: 2 }} />
              <Box>
                <Typography>
                  <span style={{ marginRight: 10 }}>Answer:</span>
                  {question.answer}
                </Typography>
              </Box> */}
            </Paper>
          );
        })}
      </Box>
      <LoadingComponent open={isLoading} />
      <SnackAlert snack={snack} setSnack={setSnack} />
    </React.Fragment>
  );
};

export default ViewQuiz;
