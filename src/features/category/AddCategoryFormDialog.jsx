import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingComponent from "../../components/LoadingComponent";
import SnackAlert from "../../components/Alert";

import { useCreateCategoryMutation } from "../../services/category";

const AddCategoryFormDialog = ({ open, handleClose }) => {
  const [createCategory, createCategoryRes] = useCreateCategoryMutation();
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });
  const [categoryName, setCategoryName] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Boolean(categoryName.trim())) {
      return setSnack({
        open: true,
        message: "Category Name is Required.",
        severity: "error",
      });
    }
    createCategory({
      name: categoryName,
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
  };

  React.useEffect(() => {
    setCategoryName("");
  }, [open]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
        fullWidth
      >
        <DialogTitle>Create Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="category"
            label="Category Name *"
            type="text"
            fullWidth
            variant="standard"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
      <LoadingComponent open={createCategoryRes.isLoading} />
      <SnackAlert snack={snack} setSnack={setSnack} />
    </React.Fragment>
  );
};

export default AddCategoryFormDialog;
