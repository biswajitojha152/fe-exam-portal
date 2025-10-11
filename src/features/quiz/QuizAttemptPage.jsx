import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ClearIcon from "@mui/icons-material/Clear";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useStompClient, useSubscription } from "react-stomp-hooks";

const QuizAttemptPage = () => {
  const theme = useTheme();
  const stompClient = useStompClient();
  const { questionId, quizId } = useParams();
  const navigate = useNavigate();

  const [quizInProgress, setQuizInProgress] = useState(null);

  console.log(quizInProgress, "quizProgress");
  const isBetweenExtraSmallAndLarge = useMediaQuery(
    theme.breakpoints.between("xs", "lg")
  );

  const legends = useMemo(
    () => [
      {
        label: "Answered",
        color: theme.palette.success.light,
      },
      {
        label: "Not Answered",
        color: theme.palette.error.light,
      },
      {
        label: "Not Visited",
        color: theme.palette.grey[500],
      },
      {
        label: "Marked For Review",
        color: theme.palette.secondary.light,
      },
    ],
    [theme]
  );

  const handleQuestionClick = useCallback(
    (selectedQuestionId) => {
      navigate(`/quiz/${quizId}/attempt/${selectedQuestionId}`);
    },
    [navigate, quizId]
  );

  const getQuestionPaletteColor = useCallback(
    (question) => {
      const isAnswered = question.optionDTOList.find(
        (option) => option.isCorrect
      );
      if (isAnswered) {
        return theme.palette.success.light;
      } else if (question.isVisited) {
        return theme.palette.error.light;
      } else if (question.isMarkedForReview) {
        return theme.palette.secondary.light;
      } else {
        return theme.palette.grey[500];
      }
    },
    [
      theme.palette.success.light,
      theme.palette.error.light,
      theme.palette.grey,
      theme.palette.secondary.light,
    ]
  );

  const handlePreviousQuestion = useCallback(() => {
    if (stompClient) {
      stompClient.publish({
        destination: "/app/question/handlePreviousQuestion",
        body: JSON.stringify({
          questionId: questionId,
        }),
      });
      const questionIndex =
        quizInProgress.quizProgressQuestionDTOList.findIndex(
          (question) => question.id === parseFloat(questionId)
        );
      navigate(
        `/quiz/${quizId}/attempt/${
          quizInProgress.quizProgressQuestionDTOList[
            questionIndex === 0 ? 0 : questionIndex - 1
          ].id
        }`
      );
    }
  }, [stompClient, quizId, questionId, quizInProgress, navigate]);

  const handleSaveAndNext = useCallback(() => {
    if (stompClient) {
      stompClient.publish({
        destination: "/app/question/handleNextQuestion",
        body: JSON.stringify({
          questionId: questionId,
        }),
      });
      const questionIndex =
        quizInProgress.quizProgressQuestionDTOList.findIndex(
          (question) => question.id === parseFloat(questionId)
        );
      navigate(
        `/quiz/${quizId}/attempt/${
          quizInProgress.quizProgressQuestionDTOList[
            questionIndex ===
            quizInProgress.quizProgressQuestionDTOList.length - 1
              ? 0
              : questionIndex + 1
          ].id
        }`
      );
    }
  }, [stompClient, quizId, questionId, quizInProgress, navigate]);

  const handleChange = useCallback(
    (value) => {
      if (stompClient) {
        stompClient.publish({
          destination: "/app/question/handleChange",
          body: JSON.stringify({
            questionId: questionId,
            optionId: value,
          }),
        });
        console.log(value, "value");
      }
    },
    [stompClient, questionId]
  );

  // const handleClearResponse = useCallback(() => {
  //   if (stompClient) {
  //     stompClient.publish({
  //       destination: "/app/question/handleClearResponse",
  //       body: JSON.stringify({
  //         questionId: questionId,
  //       }),
  //     });
  //   }
  // }, [stompClient, questionId]);

  useSubscription("/user/queue/getQuizById", (message) => {
    console.log(JSON.parse(message.body));
    setQuizInProgress(JSON.parse(message.body));
  });

  useEffect(() => {
    if (stompClient) {
      stompClient.publish({
        destination: "/app/quiz/getQuizById",
        body: questionId,
      });
    }
  }, [stompClient, questionId]);

  return quizInProgress ? (
    <Fragment>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "sticky",
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar,
        }}
        elevation={2}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }} color="text.primary">
          {quizInProgress?.name}
        </Typography>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8} xl={9}>
          {quizInProgress &&
            quizInProgress.quizProgressQuestionDTOList.map(
              (question, questionIndex) => {
                if (question.id !== parseInt(questionId)) {
                  return null;
                }
                return (
                  <Box sx={{ p: 2 }} key={question.id}>
                    <Typography variant="h6" fontWeight="bold">
                      Question No. {questionIndex + 1}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      {question.name}
                    </Typography>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        onChange={(e) => handleChange(e.target.value)}
                      >
                        {question.optionDTOList?.map((option) => (
                          <FormControlLabel
                            checked={option.isCorrect}
                            key={option.id}
                            value={option.id}
                            control={<Radio />}
                            label={option.name}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Box>
                );
              }
            )}
        </Grid>
        <Grid item xs={12} lg={4} xl={3}>
          <Box sx={{ p: 2 }} component={Paper} elevation={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: "center",
              }}
            >
              <AccessAlarmIcon color="error" />
              <Typography variant="h5">00:00:00</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Question Palette:
            </Typography>
            <Grid container spacing={1}>
              {quizInProgress &&
                quizInProgress.quizProgressQuestionDTOList.map(
                  (item, questionIndex) => {
                    return (
                      <Grid item xs={2.4} key={item.id}>
                        <Typography
                          align="center"
                          sx={{
                            // border: "1px solid black",
                            borderRadius: 1,
                            boxShadow: (theme) => theme.shadows[4],
                            p: 1,
                            backgroundColor: getQuestionPaletteColor(item),
                            color: "white",
                            cursor: "pointer",
                          }}
                          variant="h6"
                          onClick={() => handleQuestionClick(item.id)}
                        >
                          {questionIndex + 1}
                        </Typography>
                      </Grid>
                    );
                  }
                )}
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="body1" fontWeight="bold" gutterBottom>
                Legend:
              </Typography>
              <Grid container spacing={1}>
                {legends.map((legend) => {
                  return (
                    <Grid item xs={6} key={legend.label}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            height: 15,
                            width: 15,
                            backgroundColor: legend.color,
                          }}
                        />
                        <Typography>{legend.label}</Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          position: isBetweenExtraSmallAndLarge ? "static" : "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8} xl={9}>
            <Paper
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: {
                  xs: "column",
                  lg: "row",
                },
                p: 2,
                gap: 1,
              }}
              elevation={2}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexDirection: {
                    xs: "column",
                    lg: "row",
                  },
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIosIcon />}
                  sx={{
                    textTransform: "none",
                    fontSize: 18,
                    letterSpacing: 1,
                  }}
                  onClick={handlePreviousQuestion}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  sx={{
                    textTransform: "none",
                    fontSize: 18,
                    letterSpacing: 1,
                  }}
                  onClick={() => handleChange(null)}
                >
                  Clear response
                </Button>
              </Box>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIosIcon />}
                sx={{ textTransform: "none", fontSize: 18, letterSpacing: 1 }}
                onClick={handleSaveAndNext}
              >
                Save & Next
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={4} xl={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              elevation={2}
            >
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontSize: 18,
                  letterSpacing: 1,
                }}
              >
                Submit
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  ) : null;
};

export default QuizAttemptPage;
