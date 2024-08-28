const config = Object.freeze({
  baseUrl: "http://localhost:8080/",
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
  },
});

export default config;
