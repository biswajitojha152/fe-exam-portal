const config = Object.freeze({
  // baseUrl: "http://localhost:8080/",
  baseUrl: "http://172.20.10.2:8080/",
  apiName: {
    login: "api/auth/signIn",
    getDashboardData: "api/dashboard/getDashboardSummary",
    getAllCategory: "api/category/getAllCategories",
    createCategory: "api/category/saveCategory",
    getAllQuiz: "api/quiz/getAllQuiz",
    getQuizById: "api/quiz/getQuizById",
    createQuiz: "api/quiz/saveQuiz",
    updateQuiz: "api/quiz/updateQuiz",
    updateQuizStatus: "api/quiz/updateQuizStatus",
    saveQuestion: "api/question/saveQuestion",
    getAllQuestions: "api/question/getAllQuestions",
  },
});

export default config;
