import { Fragment, useCallback } from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Box,
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useGetAllRecommendedQuizQuery } from "../../services/quiz";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";
import { useGetQuizTrailQuery } from "../../services/dashboard";
import moment from "moment";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { data: recommendedQuizList = [] } = useGetAllRecommendedQuizQuery();
  const {
    data: quizTrail = {
      totalPages: 0,
      data: [],
    },
    isLoading,
  } = useGetQuizTrailQuery({
    fromDate: null,
    toDate: null,
    searchByUsername: null,
    categoryId: null,
    quizId: null,
    status: null,
    pageNo: 0,
    pageSize: 3,
  });

  const handleStartQuiz = useCallback(
    (quizId) => {
      navigate(`/quiz/${quizId}/instructions`);
    },
    [navigate]
  );

  return (
    <Fragment>
      <Typography variant="h5" fontWeight={600} mb={2} color="text.primary">
        Hi Ashoka 👋, ready for a new quiz?
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {4}
              </Typography>
              <Typography color="text.secondary" variant="h6">
                Quizzes Attempted
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {82.5}
              </Typography>
              <Typography color="text.secondary" variant="h6">
                Average Score
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {95}
              </Typography>
              <Typography color="text.secondary" variant="h6">
                Best Score
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {"1 hr 30 min"}
              </Typography>
              <Typography color="text.secondary" variant="h6">
                Total Time Spent
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                variant="h5"
                fontWeight={600}
                color="text.primary"
                gutterBottom
              >
                Recommended Quizzes
              </Typography>
              <Grid container spacing={1}>
                {recommendedQuizList.map((quiz) => {
                  return (
                    <Grid item xs={12} key={quiz.id}>
                      <Paper
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          px: 2,
                          py: 1,
                        }}
                        variant="outlined"
                      >
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {quiz.name}
                          </Typography>
                          <Typography color="text.secondary">
                            {quiz.categoryName} &bull; {quiz.duration} min
                          </Typography>
                        </Box>
                        <Button
                          variant="contained"
                          sx={{
                            textTransform: "none",
                            fontSize: 17,
                            letterSpacing: 1,
                            whiteSpace: "nowrap",
                          }}
                          onClick={() => handleStartQuiz(quiz.id)}
                        >
                          Start Now
                        </Button>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={600}
                  color="text.primary"
                  gutterBottom
                >
                  Recent Activity
                </Typography>
                <Link href="/">
                  <Typography>View All Activity</Typography>
                </Link>
              </Box>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow
                      sx={{
                        ".MuiTableCell-root": {
                          fontSize: "1rem",
                          fontWeight: "bold",
                          letterSpacing: 1,
                          color: "text.secondary",
                        },
                      }}
                    >
                      <TableCell>Quiz</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell>Date & Time</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {quizTrail.data.map((activity) => {
                      return (
                        <TableRow
                          key={activity.id}
                          sx={{
                            "& > *": { border: "unset" },
                            ".MuiTableCell-root": {
                              fontSize: "1rem",
                              letterSpacing: 1,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: 160,
                              color: "text.secondary",
                              py: 2.28,
                            },
                          }}
                        >
                          <TableCell>{activity.quizDTO.name}</TableCell>
                          <TableCell>{activity.quizDTO.categoryName}</TableCell>
                          <TableCell>
                            {moment(activity.attemptedAt).format(
                              "DD MMM YYYY, hh:mm A"
                            )}
                          </TableCell>
                          <TableCell>{activity.status}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <LoadingComponent open={isLoading} />
    </Fragment>
  );
};

export default UserDashboard;
