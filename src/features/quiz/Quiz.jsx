import React from "react";

import TopViewNav from "../../components/TopViewNav";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  useGetAllQuizQuery,
  useUpdateQuizStatusMutation,
} from "../../services/quiz";
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Link,
  TextField,
  InputAdornment,
  Grid,
  Autocomplete,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Switch from "@mui/material/Switch";

import { Link as RouterLink } from "react-router-dom";
import SnackAlert from "../../components/Alert";
import LoadingComponent from "../../components/LoadingComponent";
import AddQuizFormDialog from "./AddQuizFormDialog";
import { useGetAllCategoryQuery } from "../../services/category";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryFilter,
  setPageNo,
  setPageSizeAndPageNo,
  setSearchInput,
} from "./quizSlice";
import useDebounce from "../../hooks/useDebounce";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Quiz = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.quiz.category);
  const categoryInputVal = useSelector((state) => state.quiz.categoryInputVal);
  const searchInput = useSelector((state) => state.quiz.searchInput);
  const pageNo = useSelector((state) => state.quiz.pageNo);
  const pageSize = useSelector((state) => state.quiz.pageSize);
  const searchQuery = useDebounce(searchInput, 500);
  const {
    data: quizList = {
      data: [],
      pageNumber: 0,
      pageSize: 0,
      totalElements: 0,
    },
    isLoading,
  } = useGetAllQuizQuery({
    pageNo,
    pageSize,
    categoryId: category && category.id,
    searchInput: searchQuery || null,
  });
  const { data: categoryList = [] } = useGetAllCategoryQuery();
  const [updateQuizStatus] = useUpdateQuizStatusMutation();
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const [open, setOpen] = React.useState(false);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleStatus = (e, quiz) => {
    updateQuizStatus({
      id: quiz.id,
      name: quiz.name,
      description: quiz.description,
      active: e.target.checked,
    })
      .unwrap()
      .then((res) => {
        setSnack({ open: true, message: res.message, severity: "success" });
      })
      .catch((err) => {
        setSnack({
          open: true,
          message: err.data?.message || err.data,
        });
      });
  };

  const handleCategoryFilterchange = React.useCallback(
    (inputVal) => {
      dispatch(setCategoryFilter(inputVal));
    },
    [dispatch]
  );

  const handleChangePage = (event, newPage) => {
    dispatch(setPageNo(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(
      setPageSizeAndPageNo({
        pageSize: parseInt(event.target.value, 10),
        pageNo: 0,
      })
    );
  };

  const topViewNavData = React.useMemo(
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
      addOn: {
        isButton: true,
        buttonText: "Add Quiz",
        startIcon: <AddIcon />,
        handleClick: handleOpen,
      },
    }),
    [handleOpen]
  );

  return (
    <React.Fragment>
      <TopViewNav topViewNavData={topViewNavData} />
      <Box sx={{ mt: 2 }}>
        <Box sx={{ mb: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Autocomplete
                disablePortal
                options={categoryList}
                getOptionLabel={(option) => option.name}
                size="small"
                value={category}
                onChange={(e, newVal) =>
                  handleCategoryFilterchange({
                    category: newVal,
                    categoryInputVal,
                  })
                }
                inputValue={categoryInputVal}
                onInputChange={(e, newVal) =>
                  handleCategoryFilterchange({
                    category,
                    categoryInputVal: newVal,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Select Category" />
                )}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                label="Search"
                size="small"
                value={searchInput}
                onChange={(e) => dispatch(setSearchInput(e.target.value))}
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
        <TableContainer component={Paper} sx={{ maxHeight: "67vh" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>SL No.</StyledTableCell>
                <StyledTableCell>Quiz Name</StyledTableCell>
                <StyledTableCell>Category</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizList.data.map((quiz, index) => {
                return (
                  <StyledTableRow key={quiz.id}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>
                      <Link
                        underline="hover"
                        component={RouterLink}
                        sx={{ fontSize: 16 }}
                        to={`/quiz/${quiz.id}`}
                      >
                        {quiz.name}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>{quiz.categoryName}</StyledTableCell>
                    <StyledTableCell>{quiz.description}</StyledTableCell>
                    <StyledTableCell>
                      <Switch
                        size="small"
                        color="success"
                        checked={quiz.active}
                        onChange={(e) => handleStatus(e, quiz)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={quizList.totalElements}
          page={pageNo}
          onPageChange={handleChangePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <AddQuizFormDialog
        open={open}
        handleClose={handleClose}
        categoryList={categoryList}
      />
      <LoadingComponent open={isLoading} />
      <SnackAlert snack={snack} setSnack={setSnack} />
    </React.Fragment>
  );
};

export default Quiz;
