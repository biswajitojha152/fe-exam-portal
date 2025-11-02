import { Fragment, useCallback, useMemo, useState } from "react";

import { useGetQuizTrailQuery } from "../../services/dashboard";

import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import TopViewNav from "../../components/TopViewNav";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import DownloadIcon from "@mui/icons-material/Download";

import moment from "moment";

import { PASSED, FAILED } from "../../helper/constants";
import { useGetAllQuizQuery } from "../../services/quiz";
import { useGetAllCategoryQuery } from "../../services/category";

import LoadingComponent from "../../components/LoadingComponent.jsx";
import { downloadResultPDF } from "../../helper/helper.js";

const ViewAllActivity = () => {
  const [filterData, setFilterData] = useState({
    fromDate: null,
    toDate: null,
    selectedCategory: null,
    selectedCategoryInputVal: "",
    selectedQuiz: null,
    selectedQuizInputVal: "",
    selectedStatus: null,
    selectedStatusInputVal: "",
    pageNo: 1,
  });

  const {
    data: quizTrail = {
      data: [],
      totalPages: 0,
    },
    isLoading,
  } = useGetQuizTrailQuery({
    fromDate:
      filterData.fromDate &&
      moment(filterData.fromDate.$d).startOf("day").utc().toISOString(),
    toDate:
      filterData.toDate &&
      moment(filterData.toDate.$d).endOf("day").utc().toISOString(),
    searchByUsername: null,
    categoryId: filterData.selectedCategory && filterData.selectedCategory.id,
    quizId: filterData.selectedQuiz && filterData.selectedQuiz.id,
    status: filterData.selectedStatus,
    pageNo: filterData.pageNo - 1,
    pageSize: 10,
  });
  const {
    data: quizList = {
      data: [],
    },
  } = useGetAllQuizQuery({
    pageNo: 0,
    pageSize: 0,
    categoryId: filterData.selectedCategory && filterData.selectedCategory.id,
  });

  const { data: categoryList = [] } = useGetAllCategoryQuery();

  const handleChange = useCallback((name, value) => {
    if (name === "selectedCategory") {
      setFilterData((preVal) => ({
        ...preVal,
        selectedQuiz: null,
        selectedQuizInputVal: "",
        pageNo: 1,
        [name]: value,
      }));
    } else {
      setFilterData((preVal) => ({
        ...preVal,
        pageNo: 1,
        [name]: value,
      }));
    }
  }, []);

  const handlePageChange = useCallback((e, value) => {
    setFilterData((prevData) => ({
      ...prevData,
      pageNo: value,
    }));
  }, []);

  const handleDownloadResult = useCallback((result) => {
    downloadResultPDF(result);
  }, []);

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
        label: "Activity",
        icon: <HistoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
      },
    }),
    []
  );

  return (
    <Fragment>
      <TopViewNav topViewNavData={topViewNavData} />
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ fontWeight: 600, letterSpacing: 1 }}>
              All Activities
            </Typography>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                maxDate={filterData.toDate}
                label="From"
                value={filterData.fromDate}
                onChange={(newVal) => handleChange("fromDate", newVal)}
                slotProps={{
                  actionBar: {
                    actions: ["clear"],
                  },
                  textField: {
                    variant: "standard",
                    readOnly: true,
                    size: "small",
                    fullWidth: true,
                  },
                }}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                minDate={filterData.fromDate}
                label="To"
                value={filterData.toDate}
                onChange={(newVal) => handleChange("toDate", newVal)}
                slotProps={{
                  actionBar: {
                    actions: ["clear"],
                  },
                  textField: {
                    variant: "standard",
                    readOnly: true,
                    size: "small",
                    fullWidth: true,
                  },
                }}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} md={2.4}>
            <Autocomplete
              size="small"
              value={filterData.selectedCategory}
              onChange={(e, newVal) => {
                handleChange("selectedCategory", newVal);
              }}
              inputValue={filterData.selectedCategoryInputVal}
              onInputChange={(e, newVal) => {
                handleChange("selectedCategoryInputVal", newVal);
              }}
              options={categoryList}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Category"
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={2.4}>
            <Autocomplete
              size="small"
              value={filterData.selectedQuiz}
              onChange={(e, newVal) => handleChange("selectedQuiz", newVal)}
              inputValue={filterData.selectedQuizInputVal}
              onInputChange={(e, newVal) =>
                handleChange("selectedQuizInputVal", newVal)
              }
              options={quizList.data}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Select Quiz" variant="standard" />
              )}
            />
          </Grid>

          <Grid item xs={6} md={2.4}>
            <Autocomplete
              size="small"
              value={filterData.selectedStatus}
              onChange={(e, newVal) => handleChange("selectedStatus", newVal)}
              inputValue={filterData.selectedStatusInputVal}
              onInputChange={(e, newVal) =>
                handleChange("selectedStatusInputVal", newVal)
              }
              options={[PASSED, FAILED]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Status"
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{
                maxHeight: 450,
              }}
            >
              <Table stickyHeader>
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
                    <TableCell>Sl No.</TableCell>
                    <TableCell>Quiz</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Date & Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Boolean(quizTrail.data.length) ? (
                    quizTrail.data.map((activity, index) => {
                      return (
                        <TableRow
                          key={activity.id}
                          sx={{
                            // "& > *": { border: "unset" },
                            ".MuiTableCell-root": {
                              fontSize: "1rem",
                              letterSpacing: 1,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: 160,
                              color: "text.secondary",
                              py: 2.28,
                              "&:nth-last-of-type(2)": {
                                color: (theme) =>
                                  activity.status === PASSED
                                    ? theme.palette.success.main
                                    : theme.palette.error.main,
                              },
                            },
                          }}
                        >
                          <TableCell>
                            {(filterData.pageNo - 1) * 10 + index + 1}
                          </TableCell>
                          <TableCell>{activity.quizDTO.name}</TableCell>
                          <TableCell>{activity.quizDTO.categoryName}</TableCell>
                          <TableCell>
                            {(activity.correctAnswer /
                              activity.totalQuestions) *
                              100}
                            %
                          </TableCell>
                          <TableCell>
                            {moment(activity.attemptedAt).format(
                              "DD MMM YYYY, hh:mm A"
                            )}
                          </TableCell>
                          <TableCell>{activity.status}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{ textTransform: "none", fontSize: 15 }}
                              startIcon={<DownloadIcon />}
                              onClick={() => handleDownloadResult(activity)}
                            >
                              Download Result
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <Box
                          sx={{
                            textAlign: "center",
                            fontSize: 16,
                            letterSpacing: 1,
                          }}
                        >
                          {isLoading ? "Fetching data." : "No record found."}
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack alignItems="flex-end" sx={{ py: 1, pr: { xs: 1, sm: 1 } }}>
              <Pagination
                variant="outlined"
                shape="rounded"
                count={quizTrail.totalPages}
                page={filterData.pageNo}
                onChange={handlePageChange}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <LoadingComponent open={isLoading} />
    </Fragment>
  );
};

export default ViewAllActivity;
