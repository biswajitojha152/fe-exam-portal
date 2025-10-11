import { Fragment, useCallback } from "react";
import {
  Box,
  Divider,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  useGetQuizInstructionsQuery,
  useStartQuizMutation,
} from "../../services/quiz";

import LoadingComponent from "../../components/LoadingComponent";
import SnackAlert from "../../components/SnackAlert";

const QuizInstructions = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [startQuiz, startQuizRes] = useStartQuizMutation();
  const [snack, setSnack] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const {
    data: quizInstructions = {
      instructions: [],
    },
    isSuccess,
    isLoading,
  } = useGetQuizInstructionsQuery(quizId);
  const [hasAgreedToInstructions, setHasAgreedToInstructions] = useState(false);
  const handleCancelStart = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleStartQuiz = useCallback(() => {
    startQuiz({ id: quizId })
      .unwrap()
      .then((res) => {
        navigate(`/quiz/${res.quizId}/attempt/${res.firstQuestionId}`, {
          replace: true,
        });
      })
      .catch((err) => {
        setSnack({
          open: true,
          message: err.data?.message || err.data,
          severity: "error",
        });
      });
  }, [navigate, quizId, startQuiz]);

  return (
    <Fragment>
      {isSuccess && (
        <Paper
          sx={{
            p: {
              xs: 2,
              md: 4,
            },
            maxWidth: 800,
            mt: {
              xs: 0,
              md: 4,
            },
            mx: "auto",
          }}
          variant="outlined"
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            Quiz Instructions
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            {quizInstructions.quizName}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {quizInstructions.quizDescription}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
              Total Questions: {quizInstructions.totalQuestions}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
              Time: {quizInstructions.duration}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Instructions:
            </Typography>
            <List sx={{ px: 1 }}>
              {quizInstructions.instructions.map((text, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemText primary={`\u2022 ${text}`} />
                </ListItem>
              ))}
            </List>
          </Box>
          <FormControlLabel
            name="hasAgreedToInstructions"
            control={
              <Checkbox
                checked={hasAgreedToInstructions}
                onChange={(e) => setHasAgreedToInstructions(e.target.checked)}
              />
            }
            label="I have read and understood the instructions."
          />
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleCancelStart}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={!hasAgreedToInstructions}
              sx={{
                "&.Mui-disabled": {
                  // color: "#FFFFFF",
                  // backgroundColor: "rgba(25, 118, 210, 0.12)",
                  background: "#B2E5F6",
                  color: "#FFFFFF",
                },
              }}
              fullWidth
              onClick={handleStartQuiz}
            >
              Start Quiz
            </Button>
          </Box>
        </Paper>
      )}
      <LoadingComponent open={isLoading || startQuizRes.isLoading} />
      <SnackAlert snack={snack} setSnack={setSnack} />
    </Fragment>
  );
};

export default QuizInstructions;
