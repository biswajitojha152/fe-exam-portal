const config = Object.freeze({
  baseUrl: "http://localhost:8080/",
  apiName: {
    login: "api/auth/signIn",
    getDashboardData: "api/dashboard/getDashboardSummary",
    getAllCategory: "api/category/getAllCategories",
    createCategory: "api/category/saveCategory",
  },
});

export default config;
