import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingComponent from "../../components/LoadingComponent";
import { useCreateCategoryMutation } from "../../services/category";

const AddCategoryFormDialog = ({ open, handleClose }) => {
  const [createCategory, createCategoryRes] = useCreateCategoryMutation();
  const [categoryName, setCategoryName] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    createCategory({
      name: categoryName,
    })
      .unwrap()
      .then((res) => {
        alert(res.message);
      })
      .catch((err) => alert(err.data.message || err.data));
    handleClose();
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
            required
            margin="dense"
            id="name"
            name="category"
            label="Category Name"
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
    </React.Fragment>
  );
};

export default AddCategoryFormDialog;
