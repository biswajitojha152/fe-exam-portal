import React from "react";
import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";

import LoadingComponent from "./components/LoadingComponent";

import UserLayout from "./routes/UserLayout";

const Login = React.lazy(() => import("./features/login/Login"));

const Dashboard = React.lazy(() => import("./features/dashboard/Dashboard"));

const Category = React.lazy(() => import("./features/category/Category"));
const Quiz = React.lazy(() => import("./features/quiz/Quiz"));

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<LoadingComponent open={true} />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route element={<UserLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/quiz" element={<Quiz />} />
          </Route>
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
