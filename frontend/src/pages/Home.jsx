import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="container home-container text-center">
      <h1 className="display-4 fw-bold mb-3">Welcome to Fitness Tracker</h1>
      <p className="lead mb-4">
        Track your workouts, nutrition, and health metrics all in one place.
      </p>
      <Link to="/register" className="btn btn-primary me-3">
        Get Started
      </Link>
      <Link to="/login" className="btn btn-success">
        Login
      </Link>
    </div>
  );
};

export default Home;
