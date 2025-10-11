import { Fragment, useState, useCallback, useMemo } from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";

import SnackAlert from "../../components/SnackAlert";
import SaveQuizFormDialog from "./SaveQuizFormDialog";
import { useGetAllCategoryQuery } from "../../services/category";

import QuizListTable from "./QuizListTable";

import TopViewNav from "../../components/TopViewNav";

const QuizAdmin = () => {
  const { data: categoryList = [] } = useGetAllCategoryQuery();
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [open, setOpen] = useState(false);
  const [quizToUpdate, setQuizToUpdate] = useState(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSetQuizToUpdate = useCallback(
    (quiz) => {
      setQuizToUpdate(quiz);
      handleOpen();
    },
    [handleOpen]
  );

  const handleResetQuizToUpdate = useCallback(() => {
    setQuizToUpdate(null);
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
    <Fragment>
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
    </Fragment>
  );
};

export default QuizAdmin;
