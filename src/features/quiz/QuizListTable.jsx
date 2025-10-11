import React from "react";

import {
  Box,
  Paper,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  Autocomplete,
  Button,
  Pagination,
  Checkbox,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

import TimelineIcon from "@mui/icons-material/Timeline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import SearchIcon from "@mui/icons-material/Search";
import BootstrapTooltip from "../../components/BootstrapTooltip";
import {
  useGetAllQuizQuery,
  useGetQuizIdsWithQuizCountQuery,
  useUpdateQuizzesStatusMutation,
} from "../../services/quiz";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryFilter, setPageNo, setSearchInput } from "./quizSlice";
import useDebounce from "../../hooks/useDebounce";
import { useGetAllCategoryQuery } from "../../services/category";
import LoadingComponent from "../../components/LoadingComponent";
import RemarkFormDialog from "../../components/RemarkFormDialog";

import { formatDuration } from "../../helper/helper";
import QuizzesStatusUpdateTrailDialog from "./QuizzesStatusUpdateTrailDialog";
import SnackAlert from "../../components/SnackAlert";
import QuizUpdateTrailDialog from "./QuizUpdateTrailDialog";

const Row = React.memo(
  ({
    index,
    quiz,
    handleSetQuizToUpdate,
    pageNo,
    isSelected,
    handleRowClick,
    handleOpenQuizUpdateTrailDialog,
  }) => {
    const dataCells = React.useMemo(
      () => (
        <React.Fragment>
          <TableCell>{(pageNo - 1) * 10 + index + 1}</TableCell>
          <TableCell>
            <Link
              underline="hover"
              component={RouterLink}
              to={`/quiz/${quiz.id}`}
            >
              {quiz.name}
            </Link>
          </TableCell>
          <TableCell>
            <Stack direction="row" gap={1}>
              <Chip
                label={quiz.attemptableCount}
                color="primary"
                size="small"
              />
              <Chip
                label={formatDuration(quiz.duration)}
                color="warning"
                size="small"
              />
            </Stack>
          </TableCell>
          <TableCell>
            <BootstrapTooltip
              title={<Typography>{quiz.categoryName}</Typography>}
            >
              <Box
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {quiz.categoryName}
              </Box>
            </BootstrapTooltip>
          </TableCell>
          <TableCell>
            <BootstrapTooltip
              title={<Typography>{quiz.description}</Typography>}
            >
              <Box
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {quiz.description}
              </Box>
            </BootstrapTooltip>
          </TableCell>
          <TableCell>
            <Stack direction="row" spacing={2}>
              <Chip
                label={quiz.quizQuestionCountDTO.totalQuestionCount}
                variant="outlined"
                color="info"
              />
              <Chip
                label={quiz.quizQuestionCountDTO.activeQuestionCount}
                variant="outlined"
                color="success"
              />
              <Chip
                label={quiz.quizQuestionCountDTO.inActiveQuestionCount}
                variant="outlined"
                color="error"
              />
            </Stack>
          </TableCell>
          <TableCell>
            <BootstrapTooltip title="Update Quiz">
              <IconButton onClick={() => handleSetQuizToUpdate(quiz)}>
                <DriveFileRenameOutlineIcon color="info" />
              </IconButton>
            </BootstrapTooltip>
            <BootstrapTooltip title="Quiz update trail">
              <IconButton
                onClick={() => handleOpenQuizUpdateTrailDialog(quiz.id)}
              >
                <TimelineIcon color="warning" />
              </IconButton>
            </BootstrapTooltip>
          </TableCell>
        </React.Fragment>
      ),
      [
        index,
        quiz,
        handleSetQuizToUpdate,
        pageNo,
        handleOpenQuizUpdateTrailDialog,
      ]
    );
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
            maxWidth: 250,
            backgroundColor: quiz.isActive
              ? "transparent"
              : "var(--clr-in-active)",
          },
        }}
      >
        <TableCell>
          <Checkbox
            name={quiz.name}
            checked={isSelected}
            onChange={(e) => handleRowClick(e.target.checked, quiz)}
          />
        </TableCell>
        {dataCells}
      </TableRow>
    );
  }
);

const QuizListTable = ({ handleSetQuizToUpdate }) => {
  const [updateQuizzesStatus, updateQuizzesStatusRes] =
    useUpdateQuizzesStatusMutation();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.quiz.category);
  const categoryInputVal = useSelector((state) => state.quiz.categoryInputVal);
  const searchInput = useSelector((state) => state.quiz.searchInput);
  const pageNo = useSelector((state) => state.quiz.pageNo);
  const pageSize = useSelector((state) => state.quiz.pageSize);
  const searchQuery = useDebounce(searchInput, 500);
  const categoryQuery = useDebounce(category, 50);
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });
  const {
    data: quizList = {
      data: [],
      totalPages: 0,
      totalElements: 0,
    },
    isLoading,
  } = useGetAllQuizQuery({
    pageNo: pageNo - 1,
    pageSize,
    categoryId: categoryQuery && categoryQuery.id,
    searchInput: searchQuery || null,
  });
  const {
    data: quizIdsWithQuizCount = {
      activeIds: [],
      inActiveIds: [],
    },
  } = useGetQuizIdsWithQuizCountQuery({
    categoryId: category && category.id,
    searchInput: searchQuery || null,
  });
  const { data: categoryList = [] } = useGetAllCategoryQuery();

  const [open, setOpen] = React.useState(false);
  const [quizUpdateTrailDialog, setQuizUpdateTrailDialog] =
    React.useState(null);
  const [selected, setSelected] = React.useState([]);
  const [openRemarkDialog, setOpenRemarkDialog] = React.useState(false);

  const handleOpenRemarkDialog = React.useCallback(() => {
    setOpenRemarkDialog(true);
  }, []);

  const handleCloseRemarkDialog = React.useCallback(() => {
    setOpenRemarkDialog(false);
  }, []);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleRowClick = React.useCallback((checked, selectedQuiz) => {
    setSelected((prevData) =>
      checked
        ? [...prevData, selectedQuiz.id]
        : [...prevData.filter((id) => id !== selectedQuiz.id)]
    );
  }, []);

  const handleSelectAllClick = React.useCallback(
    (checked) => {
      if (
        checked &&
        Boolean(selected.length) &&
        selected.length < quizList.totalElements
      ) {
        setSelected([]);
      } else if (checked) {
        setSelected([
          ...quizIdsWithQuizCount.activeIds,
          ...quizIdsWithQuizCount.inActiveIds,
        ]);
      } else if (checked === false) {
        setSelected([]);
      }
    },
    [selected, quizList.totalElements, quizIdsWithQuizCount]
  );
  const handleCategoryFilterchange = React.useCallback(
    (inputVal) => {
      dispatch(setCategoryFilter(inputVal));
    },
    [dispatch]
  );

  const handleChangePage = React.useCallback(
    (event, newPage) => {
      dispatch(setPageNo(newPage));
    },
    [dispatch]
  );

  const handleOpenQuizUpdateTrailDialog = React.useCallback((quizId) => {
    setQuizUpdateTrailDialog(quizId);
  }, []);

  const handleUpdateQuizStatus = React.useCallback(
    (remark, isActive) => {
      updateQuizzesStatus({
        ids: selected,
        isActive,
        remark,
      })
        .unwrap()
        .then((res) => {
          setSnack({
            open: true,
            message: res.message,
            severity: "success",
          });
          handleCloseRemarkDialog();
          setSelected([]);
        })
        .catch((err) => {
          setSnack({
            open: true,
            message: err.data?.message || err.data,
            severity: "error",
          });
        });
    },
    [updateQuizzesStatus, selected, handleCloseRemarkDialog]
  );

  const isActiveButton = React.useMemo(
    () =>
      Boolean(selected.length) &&
      selected.every((quizId) =>
        quizIdsWithQuizCount.inActiveIds.includes(quizId)
      ),
    [selected, quizIdsWithQuizCount.inActiveIds]
  );

  const isInActiveButton = React.useMemo(
    () =>
      Boolean(selected.length) &&
      selected.every((quizId) =>
        quizIdsWithQuizCount.activeIds.includes(quizId)
      ),
    [selected, quizIdsWithQuizCount.activeIds]
  );

  React.useEffect(() => {
    setSelected((prevData) =>
      prevData.filter(
        (id) =>
          quizIdsWithQuizCount.activeIds.includes(id) ||
          quizIdsWithQuizCount.inActiveIds.includes(id)
      )
    );
  }, [quizIdsWithQuizCount.activeIds, quizIdsWithQuizCount.inActiveIds]);

  return (
    <Paper>
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            flexDirection: { xs: "column", md: "row" },
            // mb: { xs: 1 },
          },
        ]}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            width: {
              xs: "100%",
              // sm: "auto",
              md: "auto",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            Quiz List
          </Typography>
          <BootstrapTooltip
            title={
              <Typography variant="caption">
                Quizzes status update trail
              </Typography>
            }
          >
            <IconButton onClick={handleOpen}>
              <TimelineIcon color="warning" />
            </IconButton>
          </BootstrapTooltip>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: {
              xs: "100%",
              // sm: "auto",
              md: "auto",
            },
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={6} sm={12} md={1} xl={4} />
            <Grid item xs={6} sm={4} md={3} xl={2}>
              {isActiveButton && (
                <Button
                  color="success"
                  variant="contained"
                  size="small"
                  sx={{
                    display: "block",
                    width: "100%",
                    whiteSpace: "nowrap",
                    textTransform: "none",
                    fontSize: 16,
                    py: 0.75,
                  }}
                  onClick={handleOpenRemarkDialog}
                >
                  Set As Active
                </Button>
              )}
              {isInActiveButton && (
                <Button
                  color="error"
                  variant="contained"
                  size="small"
                  sx={{
                    display: "block",
                    width: "100%",
                    whiteSpace: "nowrap",
                    textTransform: "none",
                    fontSize: 16,
                    py: 0.75,
                  }}
                  onClick={handleOpenRemarkDialog}
                >
                  Set As InActive
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={4} md={4} xl={3}>
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
            <Grid item xs={12} sm={4} md={4} xl={3}>
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
      </Toolbar>
      {Boolean(selected.length) && (
        <Typography
          sx={{
            pl: 2,
            pr: 1,
          }}
        >
          {`${selected.length} row${selected.length > 1 ? "s" : ""} selected`}
        </Typography>
      )}
      <TableContainer
        sx={{
          maxHeight: 470,
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow
              sx={{
                ".MuiTableCell-root": {
                  fontSize: "1rem",
                  fontWeight: "bold",
                  letterSpacing: 1,
                  whiteSpace: "nowrap",
                  // width: "300px",
                },
              }}
            >
              <TableCell>
                <Checkbox
                  name="selectAllQuiz"
                  onChange={(e) => handleSelectAllClick(e.target.checked)}
                  indeterminate={
                    Boolean(selected.length) &&
                    selected.length < quizList.totalElements
                  }
                  checked={
                    Boolean(quizList.totalElements) &&
                    selected.length === quizList.totalElements
                  }
                  disabled={!Boolean(quizList.data.length)}
                />
              </TableCell>
              <TableCell>Sl No.</TableCell>
              <TableCell>Quiz Name</TableCell>
              <TableCell />
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>
                Total Questions
                <Typography variant="body2">
                  Total | Active | InActive
                </Typography>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Boolean(quizList.data.length) ? (
              quizList.data.map((quiz, index) => {
                return (
                  <Row
                    key={quiz.id}
                    index={index}
                    quiz={quiz}
                    handleSetQuizToUpdate={handleSetQuizToUpdate}
                    pageNo={pageNo}
                    isSelected={selected.includes(quiz.id)}
                    handleRowClick={handleRowClick}
                    handleOpenQuizUpdateTrailDialog={
                      handleOpenQuizUpdateTrailDialog
                    }
                  />
                );
              })
            ) : (
              <TableRow
                sx={{
                  ".MuiTableCell-root": {
                    fontSize: "1.1rem",
                    letterSpacing: 1,
                    textAlign: "center",
                    py: 1.5,
                  },
                }}
              >
                <TableCell colSpan={8}>
                  {isLoading ? "Fetching data." : "No record found."}
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
          count={quizList.totalPages}
          page={pageNo}
          onChange={handleChangePage}
        />
      </Stack>
      <RemarkFormDialog
        open={openRemarkDialog}
        handleClose={handleCloseRemarkDialog}
        description={
          isActiveButton
            ? `Setting the selected ${
                selected.length > 1 ? "quizzes" : "quiz"
              } as active will make ${
                selected.length > 1 ? "them" : "it"
              } visible to users. Please provide a remark explaining the reason for this action.`
            : isInActiveButton
            ? `Setting the selected ${
                selected.length > 1 ? "quizzes" : "quiz"
              } as inactive will make ${
                selected.length > 1 ? "them" : "it"
              } unavailable to users. Please provide a remark explaining the reason for this action.`
            : null
        }
        isActive={isActiveButton ? true : false}
        handleUpdateStatus={handleUpdateQuizStatus}
      />
      <QuizUpdateTrailDialog
        open={Boolean(quizUpdateTrailDialog)}
        quizId={quizUpdateTrailDialog}
        handleClose={() => setQuizUpdateTrailDialog(null)}
        key={quizUpdateTrailDialog}
      />
      <QuizzesStatusUpdateTrailDialog open={open} handleClose={handleClose} />
      <LoadingComponent open={isLoading || updateQuizzesStatusRes.isLoading} />
      <SnackAlert snack={snack} setSnack={setSnack} />
    </Paper>
  );
};

export default QuizListTable;
