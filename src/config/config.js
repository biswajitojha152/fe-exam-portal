const config = Object.freeze({
  baseUrl: "http://localhost:8080/",
  wsEndpoint: "ws",
  passPhrase: "my-secret-key",
  wsName: {},
  apiName: {
    // auth
    login: "api/auth/signIn",
    // user
    getAllUser: "api/user/getAllUser",
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
    getQuizInstructions: "api/quiz/getQuizInstructions",
    startQuiz: "api/quiz/startQuiz",
    // question
    saveQuestion: "api/question/saveQuestion",
    importQuestionsExcel: "api/question/importExcel",
    getAllQuestions: "api/question/getAllQuestions",
  },
});

export default config;
