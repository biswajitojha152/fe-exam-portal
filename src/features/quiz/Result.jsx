import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultProgressRing from "./ResultProgressRing";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { formatDuration } from "../../helper/helper";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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
  console.log(result, "result here....");
  const handleDownloadResult = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Quiz Result", 105, 20, { align: "center" });

    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Username: ${result.username}`, 20, 40);
    doc.text(`Quiz Title: ${result.quizDTO.name}`, 20, 50);
    doc.text(`Category: ${result.quizDTO.categoryName}`, 20, 60);
    doc.text(
      `Date: ${moment(result.attemptedAt).format("DD MMM YYYY, hh:mmA")}`,
      20,
      70
    );

    doc.line(20, 75, 190, 75);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Score Summary", 20, 90);

    autoTable(doc, {
      startY: 95,
      head: [["Score", "Percentage", "Status"]],
      body: [
        [
          `${result.correctAnswer}/${result.totalQuestions}`,
          `${(result.correctAnswer / result.totalQuestions) * 100}%`,
          result.status,
        ],
      ],
      theme: "striped",
      styles: {
        halign: "center",
        fontSize: 12,
        cellPadding: 6,
      },
      headStyles: {
        fillColor: result.status === PASSED ? [76, 175, 80] : [244, 67, 54],
        textColor: [255, 255, 255],
      },
    });

    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text("Thank you for participating!", 105, 280, { align: "center" });

    doc.save(`${result.quizDTO.name}_result.pdf`);
  };

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
