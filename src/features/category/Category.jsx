import React from "react";

import { Box, Paper, Typography, Grid, IconButton } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCategoryFormDialog from "./AddCategoryFormDialog";

import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";

import TopViewNav from "../../components/TopViewNav";
import LoadingComponent from "../../components/LoadingComponent";

import { useGetAllCategoryQuery } from "../../services/category";

const topViewNavData = {
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
};

const Category = () => {
  const { data: categoryList = [], isLoading } = useGetAllCategoryQuery();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
                  <Typography sx={{ fontWeight: "bold" }}>
                    {category.name}
                  </Typography>
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
      <AddCategoryFormDialog open={open} handleClose={handleClose} />
      <LoadingComponent open={isLoading} />
    </React.Fragment>
  );
};

export default Category;
