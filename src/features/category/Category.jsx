import React from "react";

import { Box, Paper, Typography, Grid, Link } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCategoryFormDialog from "./AddCategoryFormDialog";

import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";

import TopViewNav from "../../components/TopViewNav";
import LoadingComponent from "../../components/LoadingComponent";

import { useGetAllCategoryQuery } from "../../services/category";
import { useDispatch } from "react-redux";
import { setCategoryFilter } from "../quiz/quizSlice";

const Category = () => {
  const dispatch = useDispatch();
  const { data: categoryList = [], isLoading } = useGetAllCategoryQuery();

  const [open, setOpen] = React.useState(false);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = React.useCallback(() => {
    setOpen(false);
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
        label: "Category",
        icon: <FolderIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
      },
      addOn: {
        isButton: true,
        buttonText: "Add Category",
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
        <Grid container spacing={1}>
          {categoryList.map((category) => {
            return (
              <Grid item xs={12} sm={6} md={3} xl={2} key={category.name}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Link
                    underline="hover"
                    component={RouterLink}
                    to={`/quiz`}
                    onClick={() =>
                      dispatch(
                        setCategoryFilter({
                          category,
                          categoryInputVal: category.name,
                        })
                      )
                    }
                    sx={{
                      fontWeight: "bold",
                      letterSpacing: 1,
                      fontFamily: "sans-serif",
                    }}
                  >
                    {category.name}
                  </Link>
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.warning.main,
                      fontWeight: "bold",
                    }}
                  >
                    {category.quizCount}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <AddCategoryFormDialog open={open} handleClose={handleClose} />
      <LoadingComponent open={isLoading} />
    </React.Fragment>
  );
};

export default Category;
