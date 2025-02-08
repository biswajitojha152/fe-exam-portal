import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  remark: Yup.string()
    .trim()
    .min(1, "Must have at least one visible character.")
    .required("Remark is required."),
});

const RemarkFormDialog = ({
  open,
  handleClose,
  description,
  isActive,
  handleUpdateStatus,
}) => {
  const { resetForm, ...formik } = useFormik({
    initialValues: {
      remark: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleUpdateStatus(values.remark, isActive);
    },
  });

  const handleTransitionEnter = React.useCallback(() => {}, []);

  const handleTransitionExited = React.useCallback(() => {
    resetForm();
  }, [resetForm]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: formik.handleSubmit,
      }}
      sx={{
        ".MuiDialog-container": {
          alignItems: "flex-start",
        },
      }}
      onTransitionEnter={handleTransitionEnter}
      onTransitionExited={handleTransitionExited}
      fullWidth
      disableScrollLock
    >
      <DialogTitle sx={{ fontWeight: 600, letterSpacing: 0.75 }}>
        Confirm
      </DialogTitle>
      <DialogContent>
        <DialogContentText color={isActive ? "success.dark" : "error.dark"}>
          {description}
        </DialogContentText>
        <TextField
          size="small"
          name="remark"
          label="Enter Ramark *"
          fullWidth
          variant="standard"
          value={formik.values.remark}
          onChange={formik.handleChange}
          error={formik.touched.remark && Boolean(formik.errors.remark)}
          helperText={formik.touched.remark && formik.errors.remark}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Confirm Action</Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(RemarkFormDialog);
