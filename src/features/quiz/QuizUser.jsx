import React, { Fragment, memo, useEffect, useMemo, useRef } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import PsychologyIcon from "@mui/icons-material/Psychology";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import SearchIcon from "@mui/icons-material/Search";

import { useLazyGetAllQuizQuery } from "../../services/quiz";

import {
  Autocomplete,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import TopViewNav from "../../components/TopViewNav";
import { useGetAllCategoryQuery } from "../../services/category";
import { useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";

const QuizCard = memo(({ quiz, handleStartQuiz }) => {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <PsychologyIcon fontSize="large" />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {quiz.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {quiz.categoryName}
              </Typography>
            </Box>
          </Box>
          <Typography color="text.secondary">{quiz.description}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: {
              xs: 2,
              xl: 5,
            },
            mt: 1,
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            <EditNoteIcon
              // fontSize="large"
              sx={{ color: "text.secondary" }}
            />
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              <Typography color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
                Total Questions: 15
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            <AccessTimeIcon
              // fontSize="large"
              sx={{ color: "text.secondary" }}
            />
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              <Typography color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
                Time: 1hr 30min
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            // fullWidth
            sx={{
              textTransform: "none",
              fontSize: 17,
              letterSpacing: 1,
              whiteSpace: "nowrap",
            }}
            onClick={() => handleStartQuiz(quiz.id)}
          >
            Start Quiz
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
});

const QuizUser = () => {
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState(0);
  const [filterData, setFilterData] = useState({
    selectedCategory: null,
    searchInput: "",
  });
  const searchQuery = useDebounce(filterData.searchInput, 500);
  const categoryQuery = useDebounce(filterData.selectedCategory, 50);

  const [fetchQuizList, fetchQuizListRes] = useLazyGetAllQuizQuery();
  const [quizList, setQuizList] = useState({
    data: [],
    isLastPage: false,
  });
  const { data: categoryList = [] } = useGetAllCategoryQuery();
  const loader = useRef(null);
  const topViewNavData = useMemo(
    () => ({
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
    }),
    []
  );

  const fetchQuizListHandler = useCallback(() => {
    fetchQuizList({
      pageNo: pageNo,
      pageSize: 10,
      categoryId: categoryQuery && categoryQuery.id,
      searchInput: searchQuery || null,
    })
      .unwrap()
      .then((res) => {
        setQuizList((prevData) => {
          const map = new Map();
          if (pageNo === 0) {
            res.data.forEach((quizData) => {
              map.set(quizData.id, quizData);
            });
          } else {
            [...prevData.data, ...res.data].forEach((quizData) => {
              map.set(quizData.id, quizData);
            });
          }
          return { ...res, data: Array.from(map.values()) };
        });
      })
      .catch((err) => {
        console.log(err.data?.message || err.data);
        setQuizList((prevData) =>
          pageNo !== 0
            ? prevData
            : {
                data: [],
                isLastPage: true,
              }
        );
      });
  }, [fetchQuizList, pageNo, categoryQuery, searchQuery]);

  const handleChangeFilterData = useCallback((name, value) => {
    setFilterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setPageNo(0);
  }, []);

  const handleStartQuiz = useCallback(
    (quizId) => {
      navigate(`/quiz/${quizId}/instructions`);
    },
    [navigate]
  );

  const handleObserver = useCallback(
    (entities) => {
      if (
        entities[0].isIntersecting &&
        !quizList.isLastPage &&
        !fetchQuizListRes.isFetching &&
        !fetchQuizListRes.isUninitialized
      ) {
        setPageNo((prevData) => prevData + 1);
      }
    },
    [
      quizList.isLastPage,
      fetchQuizListRes.isFetching,
      fetchQuizListRes.isUninitialized,
    ]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1,
    });
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => observer.disconnect();
  }, [handleObserver]);

  useEffect(() => {
    fetchQuizListHandler();
  }, [fetchQuizListHandler]);

  return (
    <Fragment>
      <TopViewNav topViewNavData={topViewNavData} />
      <Box sx={{ my: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={4} lg={6} xl={7}>
            <Typography variant="h5" sx={{ fontWeight: 600, letterSpacing: 1 }}>
              Available Quizzes
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2.5}>
            <Autocomplete
              disablePortal
              options={categoryList}
              getOptionLabel={(option) => option.name}
              size="small"
              value={filterData.selectedCategory}
              onChange={(e, newVal) =>
                handleChangeFilterData("selectedCategory", newVal)
              }
              renderInput={(params) => (
                <TextField {...params} label="Select Category" />
              )}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2.5}>
            <TextField
              label="Search"
              size="small"
              value={filterData.searchInput}
              onChange={(e) =>
                handleChangeFilterData("searchInput", e.target.value)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        {quizList.data.map((quiz) => {
          return (
            <Grid item key={quiz.id} xs={12} md={6} alignItems="stretch">
              <QuizCard quiz={quiz} handleStartQuiz={handleStartQuiz} />
            </Grid>
          );
        })}
      </Grid>
      {!quizList.isLastPage && (
        <Box
          ref={loader}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: 1,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Fragment>
  );
};

export default QuizUser;
