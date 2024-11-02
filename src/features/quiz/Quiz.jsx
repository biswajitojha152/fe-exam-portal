import React from "react";

import TopViewNav from "../../components/TopViewNav";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import AddIcon from "@mui/icons-material/Add";

import {
  useGetAllQuizQuery,
  useUpdateQuizStatusMutation,
} from "../../services/quiz";
import {
  Box,
  Paper,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Switch from "@mui/material/Switch";

import { Link as RouterLink } from "react-router-dom";
import SnackAlert from "../../components/Alert";
import LoadingComponent from "../../components/LoadingComponent";
import AddQuizFormDialog from "./AddQuizFormDialog";

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
  const { data: quizList = [], isLoading } = useGetAllQuizQuery();
  const [updateQuizStatus] = useUpdateQuizStatusMutation();
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  const topViewNavData = {
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
  };

  return (
    <React.Fragment>
      <TopViewNav topViewNavData={topViewNavData} />
      <Box sx={{ mt: 2 }}>
        <TableContainer component={Paper} sx={{ maxHeight: "70vh" }}>
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
              {quizList.map((quiz, index) => {
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
        <IconButton
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: "white",
            position: "fixed",
            bottom: 10,
            right: 10,
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.light,
            },
          }}
          size="small"
          onClick={handleOpen}
        >
          <AddIcon fontSize="large" />
        </IconButton>
      </Box>
      <AddQuizFormDialog open={open} handleClose={handleClose} />
      <LoadingComponent open={isLoading} />
      <SnackAlert snack={snack} setSnack={setSnack} />
    </React.Fragment>
  );
};

export default Quiz;
