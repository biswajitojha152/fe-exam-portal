import React from "react";

import TopViewNav from "../../components/TopViewNav";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";

import SnackAlert from "../../components/SnackAlert";
import SaveQuizFormDialog from "./SaveQuizFormDialog";
import { useGetAllCategoryQuery } from "../../services/category";

import QuizListTable from "./QuizListTable";

const Quiz = () => {
  const { data: categoryList = [] } = useGetAllCategoryQuery();
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const [open, setOpen] = React.useState(false);
  const [quizToUpdate, setQuizToUpdate] = React.useState(null);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleSetQuizToUpdate = React.useCallback(
    (quiz) => {
      setQuizToUpdate(quiz);
      handleOpen();
    },
    [handleOpen]
  );

  const handleResetQuizToUpdate = React.useCallback(() => {
    setQuizToUpdate(null);
  }, []);

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
        <QuizListTable handleSetQuizToUpdate={handleSetQuizToUpdate} />
      </Box>
      <SaveQuizFormDialog
        open={open}
        handleClose={handleClose}
        categoryList={categoryList}
        quizToUpdate={quizToUpdate}
        handleResetQuizToUpdate={handleResetQuizToUpdate}
      />
      <SnackAlert snack={snack} setSnack={setSnack} />
    </React.Fragment>
  );
};

export default Quiz;
