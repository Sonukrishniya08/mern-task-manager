import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TaskForm from "./pages/TaskForm";

import "./App.css";

 function App() {
  return (
    <>
      <Navbar />
      {/* <Hero
        title="Task Manager"
        subtitle="Manage your tasks efficiently"
      /> */}

      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/task"
          element={
            <PrivateRoute>
              <TaskForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/task/:id"
          element={
            <PrivateRoute>
              <TaskForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;