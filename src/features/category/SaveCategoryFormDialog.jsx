import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../services/category";

import LoadingComponent from "../../components/LoadingComponent";
import SnackAlert from "../../components/SnackAlert";

const validationSchema = Yup.object().shape({
  categoryName: Yup.string()
    .trim()
    .min(1, "Category Name must have at least one visible character")
    .required("Category Name is required."),
  description: Yup.string()
    .trim()
    .min(1, "Description must have at least one visible character")
    .required("Description is required."),
});

const SaveCategoryFormDialog = ({
  open,
  handleClose,
  categoryToUpdate,
  handleResetCategoryToUpdate,
}) => {
  const [createCategory, createCategoryRes] = useCreateCategoryMutation();
  const [updateCategory, updateCategoryRes] = useUpdateCategoryMutation();

  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const { resetForm, setFieldValue, ...formik } = useFormik({
    initialValues: {
      categoryName: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (Boolean(categoryToUpdate)) {
        updateCategory({
          id: categoryToUpdate.id,
          name: values.categoryName.trim(),
          description: values.description.trim(),
        })
          .unwrap()
          .then((res) => {
            setSnack({
              open: true,
              message: res.message,
              severity: "success",
            });
            handleClose();
          })
          .catch((err) => {
            setSnack({
              open: true,
              message: err.data?.message || err.data,
              severity: "error",
            });
          });
      } else {
        createCategory({
          name: values.categoryName.trim(),
          description: values.description.trim(),
        })
          .unwrap()
          .then((res) => {
            setSnack({
              open: true,
              message: res.message,
              severity: "success",
            });
            handleClose();
          })
          .catch((err) => {
            setSnack({
              open: true,
              message: err.data?.message || err.data,
              severity: "error",
            });
          });
      }
    },
  });

  const handleTransitionEnter = React.useCallback(() => {
    if (Boolean(categoryToUpdate)) {
      setFieldValue("categoryName", categoryToUpdate.name);
      setFieldValue("description", categoryToUpdate.description);
    }
  }, [categoryToUpdate, setFieldValue]);

  const handleTransitionExited = React.useCallback(() => {
    resetForm();
    handleResetCategoryToUpdate();
  }, [resetForm, handleResetCategoryToUpdate]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: formik.handleSubmit,
        }}
        onTransitionEnter={handleTransitionEnter}
        onTransitionExited={handleTransitionExited}
        fullWidth
      >
        <DialogTitle>
          {Boolean(categoryToUpdate) ? "Update Category" : "Create Category"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                fullWidth
                name="categoryName"
                label="Category Name *"
                type="text"
                variant="standard"
                inputProps={{
                  maxLength: 50,
                }}
                value={formik.values.categoryName}
                onChange={formik.handleChange}
                error={
                  formik.touched.categoryName &&
                  Boolean(formik.errors.categoryName)
                }
                helperText={
                  formik.touched.categoryName && formik.errors.categoryName
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                fullWidth
                name="description"
                label="Description *"
                type="text"
                variant="standard"
                inputProps={{
                  maxLength: 250,
                }}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
      <LoadingComponent
        open={createCategoryRes.isLoading || updateCategoryRes.isLoading}
      />
      <SnackAlert snack={snack} setSnack={setSnack} />
    </React.Fragment>
  );
};

export default SaveCategoryFormDialog;
