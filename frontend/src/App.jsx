import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import WorkoutLog from "./pages/WorkoutLog";
import NutritionLog from "./pages/NutritionLog";
import Goals from "./pages/Goals";
import HealthMetrics from "./pages/HealthMetrics";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route
              path="/dashboard"
              element={<PrivateRoute Component={Dashboard} />}
            />
            <Route
              path="/workout-log"
              element={<PrivateRoute Component={WorkoutLog} />}
            />
            <Route
              path="/nutrition-log"
              element={<PrivateRoute Component={NutritionLog} />}
            />
            <Route path="/goals" element={<PrivateRoute Component={Goals} />} />
            <Route
              path="/health-metrics"
              element={<PrivateRoute Component={HealthMetrics} />}
            />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
