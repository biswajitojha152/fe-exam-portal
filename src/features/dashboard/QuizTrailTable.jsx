import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Toolbar,
  Pagination,
  Stack,
  TextField,
  IconButton,
  Autocomplete,
  Typography,
  Grid,
  Box,
  Paper,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import moment from "moment";

import TuneIcon from "@mui/icons-material/Tune";
import excelIcon from "../../img/excel_icon.svg";

import { FAILED, PASSED } from "../../helper/constants";

import { useGetAllCategoryQuery } from "../../services/category";
import { useGetAllQuizQuery } from "../../services/quiz";
import useDebounce from "../../hooks/useDebounce";

import {
  useGetQuizTrailQuery,
  useLazyGetQuizTrailQuery,
} from "../../services/dashboard";

import exportToExcel from "../../helper/exportToExcel";
import LoadingComponent from "../../components/LoadingComponent";
import SnackAlert from "../../components/SnackAlert";
import BootstrapTooltip from "../../components/BootstrapTooltip";

const QuizTrailTable = () => {
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });
  const [filterData, setFilterData] = React.useState({
    fromDate: null,
    toDate: null,
    searchByUsername: "",
    selectedCategory: null,
    selectedCategoryInputVal: "",
    selectedQuiz: null,
    selectedQuizInputVal: "",
    selectedStatus: null,
    selectedStatusInputVal: "",
    pageNo: 1,
  });
  const [showFilter, setShowFilter] = React.useState(false);
  const searchByUsernameInput = useDebounce(filterData.searchByUsername, 500);
  const {
    data: quizTrail = {
      totalPages: 0,
      data: [],
    },
    isLoading,
  } = useGetQuizTrailQuery({
    fromDate:
      filterData.fromDate &&
      moment(filterData.fromDate.$d).startOf("day").utc().toISOString(),
    toDate:
      filterData.toDate &&
      moment(filterData.toDate.$d).endOf("day").utc().toISOString(),
    searchByUsername: searchByUsernameInput || null,
    categoryId: filterData.selectedCategory && filterData.selectedCategory.id,
    quizId: filterData.selectedQuiz && filterData.selectedQuiz.id,
    status: filterData.selectedStatus,
    pageNo: filterData.pageNo - 1,
    pageSize: 10,
  });

  const [getQuizTrail, getQuizTrailRes] = useLazyGetQuizTrailQuery();

  const { data: categoryList = [] } = useGetAllCategoryQuery();

  const {
    data: quizList = {
      data: [],
    },
  } = useGetAllQuizQuery({
    pageNo: 0,
    pageSize: 0,
    categoryId: filterData.selectedCategory && filterData.selectedCategory.id,
  });

  const handleChange = React.useCallback((name, value) => {
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

  const handlePageChange = React.useCallback((e, value) => {
    setFilterData((prevData) => ({
      ...prevData,
      pageNo: value,
    }));
  }, []);

  const handleShowFilter = React.useCallback(() => {
    setShowFilter(!showFilter);
    setFilterData({
      fromDate: null,
      toDate: null,
      searchByUsername: "",
      selectedCategory: null,
      selectedCategoryInputVal: "",
      selectedQuiz: null,
      selectedQuizInputVal: "",
      selectedStatus: null,
      selectedStatusInputVal: "",
      pageNo: 1,
    });
  }, [showFilter]);

  const handleExportToExcel = React.useCallback(() => {
    getQuizTrail({
      fromDate:
        filterData.fromDate &&
        moment(filterData.fromDate.$d).startOf("day").utc().toISOString(),
      toDate:
        filterData.toDate &&
        moment(filterData.toDate.$d).endOf("day").utc().toISOString(),
      searchByUsername: searchByUsernameInput || null,
      categoryId: filterData.selectedCategory && filterData.selectedCategory.id,
      quizId: filterData.selectedQuiz && filterData.selectedQuiz.id,
      status: filterData.selectedStatus,
      pageNo: 0,
      pageSize: 0,
    })
      .unwrap()
      .then((res) => {
        setSnack({
          open: true,
          severity: "success",
          message: "Excel Export Success",
        });
        exportToExcel(
          res.data.map((trailData, index) => {
            return {
              "Sl No.": index + 1,
              "Date & Time": moment(trailData.attemptedAt).format(
                "DD/MM/YYYY, hh:mma"
              ),
              Username: trailData.username,
              Category: trailData.quizDTO.categoryName,
              Quiz: trailData.quizDTO.name,
              Status: trailData.status,
            };
          }),
          `Quiz_Trail_${moment().format("YYYY-MM-DD")}`
        );
      })
      .catch((err) => {
        setSnack({
          open: true,
          severity: "error",
          message: err.data?.message || err.data,
        });
      });
  }, [getQuizTrail, filterData, searchByUsernameInput]);

  return (
    <Paper>
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            mb: { xs: 1 },
          },
        ]}
      >
        <Grid container>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                Quiz Submission History
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BootstrapTooltip
                  title={showFilter ? "Remove Filter" : "Apply Filter"}
                  arrow
                >
                  <IconButton size="small" onClick={handleShowFilter}>
                    <TuneIcon
                      color={showFilter ? "primary" : "action"}
                      sx={{ fontSize: 28 }}
                    />
                  </IconButton>
                </BootstrapTooltip>
                <BootstrapTooltip title="Export Excel">
                  <Box
                    component="img"
                    src={excelIcon}
                    alt="excelIcon"
                    sx={{
                      width: 35,
                      cursor: "pointer",
                    }}
                    onClick={handleExportToExcel}
                  />
                </BootstrapTooltip>
              </Box>
            </Box>
          </Grid>
          {showFilter && (
            <Grid item xs={12}>
              <Grid container columnSpacing={2} rowSpacing={0.5}>
                <Grid item xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disableFuture
                      maxDate={filterData.toDate}
                      label="From"
                      value={filterData.fromDate}
                      onChange={(newVal) => handleChange("fromDate", newVal)}
                      slotProps={{
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
                <Grid item xs={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disableFuture
                      minDate={filterData.fromDate}
                      label="To"
                      value={filterData.toDate}
                      onChange={(newVal) => handleChange("toDate", newVal)}
                      slotProps={{
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
                <Grid item xs={4}>
                  <TextField
                    label="Search By Username"
                    name="searchByUsername"
                    variant="standard"
                    size="small"
                    value={filterData.searchByUsername}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
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
                <Grid item xs={4}>
                  <Autocomplete
                    size="small"
                    value={filterData.selectedQuiz}
                    onChange={(e, newVal) =>
                      handleChange("selectedQuiz", newVal)
                    }
                    inputValue={filterData.selectedQuizInputVal}
                    onInputChange={(e, newVal) =>
                      handleChange("selectedQuizInputVal", newVal)
                    }
                    options={quizList.data}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Quiz"
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    size="small"
                    value={filterData.selectedStatus}
                    onChange={(e, newVal) =>
                      handleChange("selectedStatus", newVal)
                    }
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
              </Grid>
            </Grid>
          )}
        </Grid>
      </Toolbar>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                ".MuiTableCell-root": {
                  fontSize: "1rem",
                  fontWeight: "bold",
                  letterSpacing: 1,
                },
              }}
            >
              <TableCell>Sl No.</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quiz Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Boolean(quizTrail.data.length) ? (
              quizTrail.data.map((trail, index) => {
                return (
                  <TableRow
                    sx={{
                      // "& > *": { borderBottom: "unset" },
                      ".MuiTableCell-root": {
                        fontSize: "1rem",
                        letterSpacing: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 160,
                      },
                    }}
                    key={trail.id}
                  >
                    <TableCell>
                      {(filterData.pageNo - 1) * 10 + index + 1}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 0.5,
                          alignItems: "flex-end",
                        }}
                      >
                        <Typography>
                          {moment(trail.attemptedAt).format("DD/MM/YYYY")}
                        </Typography>
                        <Typography variant="body2">
                          {moment(trail.attemptedAt).format("hh:mma")}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{trail.username}</TableCell>
                    <TableCell>{trail.quizDTO.categoryName}</TableCell>
                    <TableCell>{trail.quizDTO.name}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          color:
                            trail.status === PASSED ? "#51A037" : "#ED1C24",
                          backgroundColor:
                            trail.status === PASSED
                              ? "rgba(81, 160, 55, 0.1)"
                              : "rgba(237, 28, 36, 0.1)",
                          border:
                            trail.status === PASSED
                              ? `0.5px solid #51A037`
                              : `0.5px solid #ED1C24`,
                          textAlign: "center",
                          borderRadius: 1,
                          px: 0.5,
                        }}
                      >
                        {trail.status}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow
                sx={{
                  // "& > *": { borderBottom: "unset" },
                  ".MuiTableCell-root": {
                    fontSize: "1rem",
                    letterSpacing: 1,
                    textAlign: "center",
                    py: 1,
                  },
                }}
              >
                <TableCell colSpan={6}>
                  {isLoading ? "Fetching data" : "No record found."}
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
      <LoadingComponent open={isLoading || getQuizTrailRes.isLoading} />
      <SnackAlert snack={snack} setSnack={setSnack} />
    </Paper>
  );
};

export default QuizTrailTable;
