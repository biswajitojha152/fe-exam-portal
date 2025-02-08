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
    updateCategory: "api/category/updateCategory",
    updateCategoriesStatus: "api/category/updateCategoriesStatus",
    getCategoryUpdateListById: "api/category/getCategoryUpdateAuditLog",
    getCategoriesStatusUpdateList:
      "api/category/getCategoryStatusUpdateAuditLog",
    // quiz
    getAllQuiz: "api/quiz/getAllQuiz",
    getQuizById: "api/quiz/getQuizById",
    createQuiz: "api/quiz/saveQuiz",
    updateQuiz: "api/quiz/updateQuiz",
    updateQuizzesStatus: "api/quiz/updateQuizzesStatus",
    getQuizIdsWithQuizCount: "api/quiz/getQuizIdsWithQuizCount",
    getQuizUpdateListById: "api/quiz/getQuizUpdateAuditLog",
    getQuizzesStatusUpdateList: "api/quiz/getQuizStatusUpdateAuditLog",
    // question
    saveQuestion: "api/question/saveQuestion",
    getAllQuestions: "api/question/getAllQuestions",
  },
});

export default config;
