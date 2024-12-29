import React from "react";

import { Box } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SaveCategoryFormDialog from "./SaveCategoryFormDialog";

import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";

import CategoryListTable from "./CategoryListTable";

import TopViewNav from "../../components/TopViewNav";

const Category = () => {
  const [open, setOpen] = React.useState(false);
  const [categoryToUpdate, setCategoryToUpdate] = React.useState(null);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleSetCategoryToUpdate = React.useCallback(
    (category) => {
      setCategoryToUpdate(category);
      handleOpen();
    },
    [handleOpen]
  );

  const handleResetCategoryToUpdate = React.useCallback(() => {
    setCategoryToUpdate(null);
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
        <CategoryListTable
          handleSetCategoryToUpdate={handleSetCategoryToUpdate}
        />
      </Box>
      <SaveCategoryFormDialog
        open={open}
        handleClose={handleClose}
        categoryToUpdate={categoryToUpdate}
        handleResetCategoryToUpdate={handleResetCategoryToUpdate}
      />
    </React.Fragment>
  );
};

export default Category;
