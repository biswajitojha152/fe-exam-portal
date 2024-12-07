const config = Object.freeze({
  baseUrl: "http://localhost:8080/",
  apiName: {
    // auth
    login: "api/auth/signIn",
    // dashboard
    getDashboardData: "api/dashboard/getDashboardSummary",
    getQuizTrail: "api/dashboard/getQuizTrail",
    // category
    getAllCategory: "api/category/getAllCategories",
    createCategory: "api/category/saveCategory",
    // quiz
    getAllQuiz: "api/quiz/getAllQuiz",
    getQuizById: "api/quiz/getQuizById",
    createQuiz: "api/quiz/saveQuiz",
    updateQuiz: "api/quiz/updateQuiz",
    updateQuizStatus: "api/quiz/updateQuizStatus",
    // question
    saveQuestion: "api/question/saveQuestion",
    getAllQuestions: "api/question/getAllQuestions",
  },
});

export default config;
