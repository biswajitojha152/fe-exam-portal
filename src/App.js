import "./App.css";

import { Routes, Route } from "react-router-dom";

import Login from "./features/login/Login";

import Dashboard from "./features/dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
