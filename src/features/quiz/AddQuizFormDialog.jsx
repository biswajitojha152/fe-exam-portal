import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingComponent from "../../components/LoadingComponent";
import SnackAlert from "../../components/Alert";

import { useCreateQuizMutation } from "../../services/quiz";
import { Autocomplete, Grid } from "@mui/material";
import { useGetAllCategoryQuery } from "../../services/category";

const AddQuizFormDialog = ({ open, handleClose }) => {
  const { data: categoryList = [] } = useGetAllCategoryQuery();
  const [createQuiz, createQuizRes] = useCreateQuizMutation();
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const [formData, setFormData] = React.useState({
    quizName: "",
    description: "",
    category: null,
    categoryInputVal: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !Boolean(formData.quizName.trim()) ||
      !Boolean(formData.description.trim()) ||
      !Boolean(formData.category) ||
      !Boolean(formData.description.trim())
    ) {
      return setSnack({
        open: true,
        message: `All the fields are Required.`,
        severity: "error",
      });
    }

    createQuiz({
      name: formData.quizName,
      categoryId: formData.category.id,
      description: formData.description,
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
    setFormData({
      quizName: "",
      description: "",
      category: null,
      categoryInputVal: "",
    });
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
        disableScrollLock
      >
        <DialogTitle>Create Quiz</DialogTitle>
        <DialogContent>
          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="quizName"
                name="quizName"
                label="Quiz Name *"
                type="text"
                fullWidth
                variant="standard"
                value={formData.quizName}
                onChange={handleChange}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              {/* <TextField
                autoFocus
                margin="dense"
                id="quizName"
                name="quizName"
                label="Quiz Name *"
                type="text"
                fullWidth
                variant="standard"
                value={formData.quizName}
                onChange={handleChange}
                autoComplete="off"
              /> */}
              <Autocomplete
                options={categoryList}
                value={formData.category}
                onChange={(e, newVal) =>
                  handleChange({ target: { name: "category", value: newVal } })
                }
                inputValue={formData.categoryInputVal}
                onInputChange={(e, newVal) =>
                  handleChange({
                    target: { name: "categoryInputVal", value: newVal },
                  })
                }
                getOptionLabel={(option) => option.name}
                clearOnEscape
                renderInput={(params) => (
                  <TextField
                    margin="dense"
                    {...params}
                    label="Select Category *"
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="description"
                name="description"
                label="Description *"
                type="text"
                fullWidth
                variant="standard"
                value={formData.description}
                onChange={handleChange}
                autoComplete="off"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
      <LoadingComponent open={createQuizRes.isLoading} />
      <SnackAlert snack={snack} setSnack={setSnack} />
    </React.Fragment>
  );
};

export default AddQuizFormDialog;
