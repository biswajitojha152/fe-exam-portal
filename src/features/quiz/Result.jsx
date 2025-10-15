import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import ResultProgressRing from "./ResultProgressRing";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const LabelComponent = ({ label, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography>{label}</Typography>
      <Typography>{value}</Typography>
    </Box>
  );
};

const Result = () => {
  const { state } = useLocation();
  console.log(state, "state here....");
  return (
    <Fragment>
      <Paper
        sx={{
          maxWidth: 600,
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
        <Typography align="center" color="text.secondary">
          Quiz: Java Basics (Attempt 1)
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
              background: (theme) => theme.palette.success.main,
              my: 2,
            }}
          >
            <CheckIcon sx={{ color: "#fff" }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Passed
          </Typography>
        </Box>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Grid container>
            <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
              <LabelComponent label={"Score"} value={"8/10"} />
              <LabelComponent label={"Percentage"} value={"80%"} />
              <LabelComponent label={"Duration Taken"} value={"12m 35s"} />
              <LabelComponent label={"Attempted Questions"} value={"10/10"} />
              <LabelComponent label={"Corrext Answers"} value={"8"} />
              <LabelComponent label={"Incorrect Answers"} value={"2"} />
              <LabelComponent
                label={"Completed On"}
                value={"14 Oct 2025, 7:10PM"}
              />
            </Grid>
            <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <ResultProgressRing percentage={80} status="pass" size={90} />
              </Box>
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
          >
            Download Result (PDF)
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: "none", fontSize: 16 }}
            color="secondary"
          >
            Go to Home
          </Button>
        </Box>
      </Paper>
    </Fragment>
  );
};

export default Result;
