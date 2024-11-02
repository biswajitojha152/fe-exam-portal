import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import QuizIcon from "@mui/icons-material/Quiz";

import TopViewNav from "../../components/TopViewNav";
import SnackAlert from "../../components/Alert";
import LoadingComponent from "../../components/LoadingComponent";

import { useParams } from "react-router-dom";

import { useGetAllCategoryQuery } from "../../services/category";
import {
  useGetAllQuestionsQuery,
  useGetQuizByIdQuery,
  useUpdateQuizMutation,
} from "../../services/quiz";
import AddQuestionForm from "./AddQuestionForm";
import DOMPurify from "dompurify";

const ViewQuiz = () => {
  const { quizId } = useParams("quizId");
  const { data: questionList = [] } = useGetAllQuestionsQuery(quizId, {
    skip: !Boolean(quizId),
  });
  const { data: quizDetails = {}, isLoading } = useGetQuizByIdQuery(quizId);
  const { data: categoryList = [] } = useGetAllCategoryQuery();
  const [updateQuiz, updateQuizRes] = useUpdateQuizMutation();
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const topViewNavData = React.useMemo(
    () => ({
      navData: [
        {
          label: "Dashobard",
          path: "/dashboard",
          icon: <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
        },
        {
          label: "Quiz",
          path: "/quiz",
          icon: <ClassIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
        },
      ],
      data: {
        label: quizDetails.name,
        icon: <QuizIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
      },
    }),
    [quizDetails.name]
  );

  const [formData, setFormData] = React.useState({
    quizName: "",
    description: "",
    category: null,
    categoryInputVal: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuizUpdate = (event) => {
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
    updateQuiz({
      id: quizDetails.id,
      name: formData.quizName,
      description: formData.description,
      active: quizDetails.active,
    })
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
  };

  React.useEffect(() => {
    setFormData({
      quizName: quizDetails.name || "",
      description: quizDetails.description || "",
      category:
        categoryList.find(
          (category) => category.id === quizDetails.categoryId
        ) || null,
      categoryInputVal:
        categoryList.find((category) => category.id === quizDetails.categoryId)
          ?.name || "",
    });
  }, [quizDetails, categoryList]);

  return (
    <React.Fragment>
      <TopViewNav topViewNavData={topViewNavData} />
      <Box sx={{ mt: 2 }}>
        <Box component="form" onSubmit={handleQuizUpdate}>
          <Button
            variant="contained"
            sx={{ display: "block", marginLeft: "auto" }}
            color="secondary"
            type="submit"
          >
            Update
          </Button>
          <Paper sx={{ p: 2, my: 1 }}>
            {/* <Typography variant="h5" gutterBottom>
              Update Quiz
            </Typography> */}
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  disabled
                  margin="dense"
                  label="Quiz Name *"
                  variant="standard"
                  name="quizName"
                  value={formData.quizName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Autocomplete
                  disabled
                  options={categoryList}
                  value={formData.category}
                  onChange={(e, newVal) =>
                    handleChange({
                      target: { name: "category", value: newVal },
                    })
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
              <Grid item xs={12} sm={12} md={4} lg={6}>
                <TextField
                  margin="dense"
                  label="Description *"
                  variant="standard"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Paper>
          <AddQuestionForm />
          {questionList.map((question, index) => {
            return (
              <Paper key={question.id} sx={{ my: 1, p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                  }}
                >
                  <Box>
                    <Typography>{`Q${index + 1}.`}</Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(question.name),
                      }}
                      sx={{ mb: 2 }}
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography>
                          <span style={{ marginRight: 10 }}>{`1)`}</span>
                          {question.option1}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          <span style={{ marginRight: 10 }}>{`2)`}</span>
                          {question.option2}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          <span style={{ marginRight: 10 }}>{`3)`}</span>
                          {question.option3}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          <span style={{ marginRight: 10 }}>{`4)`}</span>
                          {question.option4}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box>
                  <Typography>
                    <span style={{ marginRight: 10 }}>Answer:</span>
                    {question.answer}
                  </Typography>
                </Box>
              </Paper>
            );
          })}
        </Box>
      </Box>
      <LoadingComponent open={isLoading || updateQuizRes.isLoading} />
      <SnackAlert snack={snack} setSnack={setSnack} />
    </React.Fragment>
  );
};

export default ViewQuiz;
