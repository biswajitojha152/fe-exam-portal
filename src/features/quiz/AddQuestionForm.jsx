import React from "react";
import {
  Box,
  Button,
  Grid,
  ListItemText,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import SnackAlert from "../../components/SnackAlert";
import {
  useSaveQuestionMutation,
  useImportQuestionsExcelMutation,
} from "../../services/quiz";
import { useParams } from "react-router-dom";

import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import exportToExcel from "../../helper/exportToExcel";
import LoadingComponent from "../../components/LoadingComponent";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

const AddQuestionForm = () => {
  const { quizId } = useParams();
  const fileRef = React.useRef(null);
  const [snack, setSnack] = React.useState({
    message: "",
    severity: "",
    open: false,
  });
  const [saveQuestion, saveQuestionRes] = useSaveQuestionMutation();
  const [importQuestionsExcel, importQuestionsExcelRes] =
    useImportQuestionsExcelMutation();
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
  const [formData, setFormData] = React.useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
  });
  const handleChange = React.useCallback(
    (e) => {
      if (e.target.name !== "answer") {
        return setFormData({
          ...formData,
          [e.target.name]: e.target.value,
          answer: "",
        });
      }
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData]
  );

  const handleResetForm = React.useCallback(() => {
    setFormData({
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      answer: "",
    });
  }, []);

  const isFormValid = React.useCallback(() => {
    return Boolean(
      formData.question.trim() &&
        formData.optionA.trim() &&
        formData.optionB.trim() &&
        formData.optionC.trim() &&
        formData.optionD.trim() &&
        formData.answer
    );
  }, [formData]);

  const handleSaveQuestion = React.useCallback(() => {
    saveQuestion({
      name: formData.question,
      optionDTOList: [
        formData.optionA,
        formData.optionB,
        formData.optionC,
        formData.optionD,
      ].map((option) => ({
        name: option,
        isCorrect: option === formData.answer ? true : false,
      })),
      quizId: quizId,
    })
      .unwrap()
      .then((res) => {
        setSnack({ message: res.message, open: true, severity: "success" });
        handleResetForm();
      })
      .catch((err) => {
        setSnack({
          message: err.data.message || err.data,
          open: true,
          severity: "error",
        });
      });
  }, [formData, quizId, saveQuestion, handleResetForm]);

  const handleDownloadExcelTemplate = React.useCallback(() => {
    exportToExcel(
      [
        {
          Question: null,
          "Option A": null,
          "Option B": null,
          "Option C": null,
          "Option D": null,
          Answer: null,
        },
      ],
      "Import Questions Template"
    );
  }, []);

  const handleImportExcel = React.useCallback(() => {
    fileRef.current.click();
  }, []);

  const handleFileChange = React.useCallback(
    (e) => {
      if (e.target.files[0]) {
        const formData = new FormData();
        formData.append("quizId", quizId);
        formData.append("file", e.target.files[0]);
        importQuestionsExcel(formData)
          .unwrap()
          .then((res) => {
            setSnack({
              open: true,
              message: res.message,
              severity: "success",
            });
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
    [quizId, importQuestionsExcel]
  );

  return (
    <React.Fragment>
      <Paper sx={{ p: 2 }}>
        <Tabs
          value={selectedTabIndex}
          onChange={(e, newValue) => setSelectedTabIndex(newValue)}
        >
          <Tab label="Add Question" />
          <Tab label="Import Questions" />
        </Tabs>
        <CustomTabPanel value={selectedTabIndex} index={0}>
          <React.Fragment>
            <Box sx={{ mb: 1 }}>
              <TextField
                label="Question *"
                variant="standard"
                name="question"
                id="question"
                value={formData.question}
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  label="Option A *"
                  name="optionA"
                  value={formData.optionA}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  label="Option B *"
                  name="optionB"
                  value={formData.optionB}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  label="Option C *"
                  name="optionC"
                  value={formData.optionC}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  label="Option D*"
                  name="optionD"
                  value={formData.optionD}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              {formData.optionA.trim() &&
                formData.optionB.trim() &&
                formData.optionC.trim() &&
                formData.optionD.trim() && (
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
                      <MenuItem value={formData.optionA}>
                        <ListItemText>{formData.optionA}</ListItemText>
                      </MenuItem>
                      <MenuItem value={formData.optionB}>
                        <ListItemText>{formData.optionB}</ListItemText>
                      </MenuItem>
                      <MenuItem value={formData.optionC}>
                        <ListItemText>{formData.optionC}</ListItemText>
                      </MenuItem>
                      <MenuItem value={formData.optionD}>
                        <ListItemText>{formData.optionD}</ListItemText>
                      </MenuItem>
                    </TextField>
                  </Grid>
                )}
            </Grid>
            <Button
              variant="contained"
              sx={{
                mx: "auto",
                display: "block",
                mt: 3,
                "&.Mui-disabled": {
                  // color: "#FFFFFF",
                  // backgroundColor: "rgba(25, 118, 210, 0.12)",
                  background: "#B2E5F6",
                  color: "#FFFFFF",
                },
              }}
              disabled={!isFormValid()}
              onClick={handleSaveQuestion}
            >
              Add Question
            </Button>
          </React.Fragment>
        </CustomTabPanel>
        <CustomTabPanel value={selectedTabIndex} index={1}>
          <Box
            sx={{
              p: {
                xs: 0,
                md: 4,
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: 2,
              width: {
                xs: "100%",
                md: 700,
              },
              mx: "auto",
            }}
          >
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadExcelTemplate}
              fullWidth
              sx={{ whiteSpace: "nowrap" }}
            >
              Download Excel Template
            </Button>
            <React.Fragment>
              <Button
                variant="contained"
                startIcon={<UploadIcon />}
                onClick={handleImportExcel}
                fullWidth
              >
                Import Excel
              </Button>
              <input
                type="file"
                hidden
                name="importQuestions"
                ref={fileRef}
                accept=".xlsx"
                onChange={handleFileChange}
              />
            </React.Fragment>
          </Box>
        </CustomTabPanel>
      </Paper>
      <SnackAlert snack={snack} setSnack={setSnack} />
      <LoadingComponent
        open={saveQuestionRes.isLoading || importQuestionsExcelRes.isLoading}
      />
    </React.Fragment>
  );
};

export default AddQuestionForm;
