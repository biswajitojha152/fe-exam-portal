import {
  Button,
  Grid,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SnackAlert from "../../components/SnackAlert";
import { useSaveQuestionMutation } from "../../services/quiz";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";

const AddQuestionForm = () => {
  const { quizId } = useParams();
  const [snack, setSnack] = React.useState({
    message: "",
    severity: "",
    open: false,
  });
  const [saveQuestion, saveQuestionRes] = useSaveQuestionMutation();
  const [value, setValue] = React.useState("");
  const [formData, setFormData] = React.useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });
  const handleChange = (e) => {
    if (e.target.name !== "answer") {
      return setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        answer: "",
      });
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveQuestion = () => {
    saveQuestion({
      name: value,
      option1: formData.option1,
      option2: formData.option2,
      option3: formData.option3,
      option4: formData.option4,
      answer: formData.answer,
      quizId: quizId,
    })
      .unwrap()
      .then((res) => {
        setSnack({ message: res.message, open: true, severity: "success" });
        setFormData({
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "",
        });
        setValue("");
      })
      .catch((err) => {
        setSnack({
          message: err.data.message || err.data,
          open: true,
          severity: "error",
        });
      });
  };

  return (
    <React.Fragment>
      <Paper sx={{ p: 2 }}>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              variant="standard"
              label="Option 1 *"
              name="option1"
              value={formData.option1}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="standard"
              label="Option 2 *"
              name="option2"
              value={formData.option2}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="standard"
              label="Option 3 *"
              name="option3"
              value={formData.option3}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="standard"
              label="Option 4*"
              name="option4"
              value={formData.option4}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          {formData.option1.trim() &&
            formData.option2.trim() &&
            formData.option3.trim() &&
            formData.option4.trim() && (
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  label="Select Answer *"
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  select
                  fullWidth
                >
                  <MenuItem value={formData.option1}>
                    <ListItemText>{formData.option1}</ListItemText>
                  </MenuItem>
                  <MenuItem value={formData.option2}>
                    <ListItemText>{formData.option2}</ListItemText>
                  </MenuItem>
                  <MenuItem value={formData.option3}>
                    <ListItemText>{formData.option3}</ListItemText>
                  </MenuItem>
                  <MenuItem value={formData.option4}>
                    <ListItemText>{formData.option4}</ListItemText>
                  </MenuItem>
                </TextField>
              </Grid>
            )}
        </Grid>
        <Button
          variant="contained"
          sx={{ mx: "auto", display: "block", mt: 2, mb: 1 }}
          onClick={handleSaveQuestion}
          disabled={
            !Boolean(
              value.trim() &&
                formData.option1.trim() &&
                formData.option2.trim() &&
                formData.option3.trim() &&
                formData.option4.trim() &&
                formData.answer
            )
          }
        >
          Add
        </Button>
      </Paper>
      <SnackAlert snack={snack} setSnack={setSnack} />
      <LoadingComponent open={saveQuestionRes.isLoading} />
    </React.Fragment>
  );
};

export default AddQuestionForm;
