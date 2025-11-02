import { Fragment, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultProgressRing from "./ResultProgressRing";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { downloadResultPDF, formatDuration } from "../../helper/helper";

import moment from "moment/moment";
import { PASSED } from "../../helper/constants";

const LabelComponent = ({ label, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ fontWeight: 600 }} gutterBottom>
        {label}
      </Typography>
      <Typography>{value}</Typography>
    </Box>
  );
};

const Result = () => {
  const { state: result = {} } = useLocation();
  const navigate = useNavigate();
  const handleDownloadResult = useCallback(() => {
    downloadResultPDF(result);
  }, [result]);

  return (
    <Fragment>
      <Box sx={{ p: 1 }}>
        <Paper
          sx={{
            maxWidth: 850,
            mx: "auto",
            p: 3,
            mt: 3,
          }}
          variant="outlined"
        >
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: 600 }}
            gutterBottom
          >
            Quiz Result
          </Typography>
          <Typography align="center" color="text.secondary" variant="h6">
            Quiz: {result.quizDTO.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                height: 28,
                width: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: (theme) =>
                  result.status === PASSED
                    ? theme.palette.success.main
                    : theme.palette.error.main,
                my: 2,
              }}
            >
              {result.status === PASSED ? (
                <CheckIcon sx={{ color: "#fff" }} />
              ) : (
                <CloseIcon sx={{ color: "#fff" }} />
              )}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {result.status}
            </Typography>
          </Box>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <ResultProgressRing
                    percentage={
                      (result.correctAnswer / result.totalQuestions) * 100
                    }
                    status={result.status}
                    size={90}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={2}>
                    <LabelComponent
                      label={"Score"}
                      value={`${result.correctAnswer}/${result.totalQuestions}`}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <LabelComponent
                      label={"Duration Taken"}
                      value={formatDuration(result.timeTaken / 60)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <LabelComponent
                      label={"Attempted Questions"}
                      value={`${result.attemptedQuestions}/${result.totalQuestions}`}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <LabelComponent
                      label={"Completed On"}
                      value={moment(result.attemptedAt).format(
                        "DD MMM YYYY, hh:mmA"
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
              whiteSpace: "nowrap",
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              sx={{ textTransform: "none", fontSize: 16 }}
              color="info"
              onClick={handleDownloadResult}
            >
              Download Result (PDF)
            </Button>
            <Button
              variant="contained"
              sx={{ textTransform: "none", fontSize: 16 }}
              color="secondary"
              onClick={() => navigate("/dashboard")}
            >
              Go to Home
            </Button>
          </Box>
        </Paper>
      </Box>
    </Fragment>
  );
};

export default Result;
