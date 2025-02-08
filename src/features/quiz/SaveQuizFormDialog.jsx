import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, Grid } from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  useCreateQuizMutation,
  useUpdateQuizMutation,
} from "../../services/quiz";

import LoadingComponent from "../../components/LoadingComponent";
import SnackAlert from "../../components/SnackAlert";

const validationSchema = Yup.object().shape({
  quizName: Yup.string()
    .trim()
    .min(1, "Must have at least one visible character.")
    .required("Quiz Name is required."),
  category: Yup.object().required("Category is required."),
  description: Yup.string()
    .trim()
    .min(1, "Description must have at least one visible character.")
    .required("Description is required."),
  attemptableCount: Yup.number()
    .min(10, "Minimum attemptable should be 10.")
    .max(120, "Maximum attemptable can be 120.")
    .required("Attemptable count is required."),
  duration: Yup.number()
    .min(10, "Must be greater than or equal to 10.")
    .max(120, "Must be less than or equal to 120.")
    .required("Duration is required."),
});

const SaveQuizFormDialog = ({
  open,
  handleClose,
  categoryList,
  quizToUpdate,
  handleResetQuizToUpdate,
}) => {
  const [createQuiz, createQuizRes] = useCreateQuizMutation();
  const [updateQuiz, updateQuizRes] = useUpdateQuizMutation();
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const { resetForm, setFieldValue, ...formik } = useFormik({
    initialValues: {
      quizName: "",
      description: "",
      category: null,
      categoryInputVal: "",
      attemptableCount: "",
      duration: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        name: values.quizName,
        categoryId: values.category.id,
        description: values.description,
        attemptableCount: values.attemptableCount,
        duration: values.duration,
      };
      if (Boolean(quizToUpdate)) {
        updateQuiz({
          id: quizToUpdate.id,
          ...payload,
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
        createQuiz(payload)
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
    if (Boolean(quizToUpdate)) {
      setFieldValue("quizName", quizToUpdate.name);
      setFieldValue(
        "category",
        categoryList.find(
          (category) => category.id === quizToUpdate.categoryId
        ) || null
      );
      setFieldValue(
        "categoryInputVal",
        categoryList.find((category) => category.id === quizToUpdate.categoryId)
          ?.name || ""
      );
      setFieldValue("description", quizToUpdate.description);
      setFieldValue("attemptableCount", quizToUpdate.attemptableCount);
      setFieldValue("duration", quizToUpdate.duration);
    }
  }, [quizToUpdate, setFieldValue, categoryList]);

  const handleTransitionExited = React.useCallback(() => {
    resetForm();
    handleResetQuizToUpdate();
  }, [resetForm, handleResetQuizToUpdate]);

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
        disableScrollLock
      >
        <DialogTitle>
          {Boolean(quizToUpdate) ? "Update Quiz" : "Create Quiz"}
        </DialogTitle>
        <DialogContent>
          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <TextField
                disabled={Boolean(quizToUpdate)}
                autoFocus
                margin="dense"
                name="quizName"
                label="Quiz Name *"
                type="text"
                fullWidth
                variant="standard"
                inputProps={{
                  maxLength: 50,
                }}
                value={formik.values.quizName}
                onChange={formik.handleChange}
                autoComplete="off"
                error={
                  formik.touched.quizName && Boolean(formik.errors.quizName)
                }
                helperText={formik.touched.quizName && formik.errors.quizName}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                disabled={Boolean(quizToUpdate)}
                options={categoryList}
                value={formik.values.category}
                onChange={(e, newVal) => setFieldValue("category", newVal)}
                inputValue={formik.values.categoryInputVal}
                onInputChange={(e, newVal) =>
                  setFieldValue("categoryInputVal", newVal)
                }
                getOptionLabel={(option) => option.name}
                clearOnEscape
                renderInput={(params) => (
                  <TextField
                    margin="dense"
                    {...params}
                    label="Select Category *"
                    variant="standard"
                    error={
                      formik.touched.category && Boolean(formik.errors.category)
                    }
                    helperText={
                      formik.touched.category && formik.errors.category
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                name="description"
                label="Description *"
                type="text"
                fullWidth
                variant="standard"
                inputProps={{
                  maxLength: 250,
                }}
                value={formik.values.description}
                onChange={formik.handleChange}
                autoComplete="off"
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                name="attemptableCount"
                label="Attemptable Count *"
                type="text"
                fullWidth
                variant="standard"
                inputProps={{
                  maxLength: 4,
                }}
                value={formik.values.attemptableCount}
                onChange={(e) =>
                  setFieldValue(
                    e.target.name,
                    e.target.value.replace(/\D/g, "")
                  )
                }
                autoComplete="off"
                error={
                  formik.touched.attemptableCount &&
                  Boolean(formik.errors.attemptableCount)
                }
                helperText={
                  formik.touched.attemptableCount &&
                  formik.errors.attemptableCount
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                name="duration"
                label="Duration (in minutes) *"
                type="text"
                fullWidth
                variant="standard"
                inputProps={{
                  maxLength: 4,
                }}
                value={formik.values.duration}
                onChange={(e) =>
                  setFieldValue(
                    e.target.name,
                    e.target.value.replace(/\D/g, "")
                  )
                }
                autoComplete="off"
                error={
                  formik.touched.duration && Boolean(formik.errors.duration)
                }
                helperText={formik.touched.duration && formik.errors.duration}
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
        open={createQuizRes.isLoading || updateQuizRes.isLoading}
      />
      <SnackAlert snack={snack} setSnack={setSnack} />
    </React.Fragment>
  );
};

export default React.memo(SaveQuizFormDialog);
