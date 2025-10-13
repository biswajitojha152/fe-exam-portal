import React from "react";
import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";

import LoadingComponent from "./components/LoadingComponent";

import UserLayout from "./routes/UserLayout";
import AuthRoutes from "./routes/AuthRoutes";

const Login = React.lazy(() => import("./features/login/Login"));

const DashboardRoute = React.lazy(() =>
  import("./features/dashboard/DashboardRoute")
);
const Users = React.lazy(() => import("./features/users/Users"));
const Category = React.lazy(() => import("./features/category/Category"));
const QuizRouter = React.lazy(() => import("./features/quiz/QuizRouter"));
const ViewQuiz = React.lazy(() => import("./features/quiz/ViewQuiz"));
const QuizInstructions = React.lazy(() =>
  import("./features/quiz/QuizInstructions")
);
const QuizAttemptPage = React.lazy(() =>
  import("./features/quiz/QuizAttemptPage")
);
const Result = React.lazy(() => import("./features/quiz/Result"));
const WebSocket = React.lazy(() => import("./features/websocket/WebSocket"));

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<LoadingComponent open={true} />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route element={<AuthRoutes />}>
            <Route element={<UserLayout />}>
              <Route path="/websocket" element={<WebSocket />} />
              <Route path="/dashboard" element={<DashboardRoute />} />
              <Route path="/users" element={<Users />} />
              <Route path="/category" element={<Category />} />
              <Route path="/quiz">
                <Route index element={<QuizRouter />} />
                <Route path=":quizId">
                  <Route index element={<ViewQuiz />} />
                  {/* <Route path="instructions" element={<QuizInstructions />} />
                <Route path="attempt" element={<QuizAttemptPage />} /> */}
                </Route>
              </Route>
            </Route>
            <Route path="/quiz/:quizId">
              <Route path="instructions" element={<QuizInstructions />} />
              <Route path="attempt/:questionId" element={<QuizAttemptPage />} />
              <Route path="result" element={<Result />} />
            </Route>
          </Route>
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
