import React, { useState, useEffect } from "react";
import axios from "axios";

const HealthMetrics = () => {
  const [metrics, setMetrics] = useState([]);
  const [newMetric, setNewMetric] = useState({
    weight: "",
    bmi: "",
    hydrationLevel: "",
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/api/health-metrics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMetrics(res.data);
    } catch (error) {
      console.error("Error fetching health metrics:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewMetric({ ...newMetric, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:4000/api/health-metrics", newMetric, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewMetric({
        weight: "",
        bmi: "",
        hydrationLevel: "",
      });
      fetchMetrics();
    } catch (error) {
      console.error("Error adding health metric:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/api/health-metrics/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMetrics();
    } catch (error) {
      console.error("Error deleting health metric:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Health Metrics</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="number"
              name="weight"
              value={newMetric.weight}
              onChange={handleInputChange}
              placeholder="Weight (kg)"
              className="form-control"
              step="0.1"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              name="bmi"
              value={newMetric.bmi}
              onChange={handleInputChange}
              placeholder="BMI"
              className="form-control"
              step="0.1"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              name="hydrationLevel"
              value={newMetric.hydrationLevel}
              onChange={handleInputChange}
              placeholder="Hydration Level (%)"
              className="form-control"
              min="0"
              max="100"
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Add Health Metric
        </button>
      </form>
      <h2 className="mb-3">Recent Health Metrics</h2>
      <ul className="list-group">
        {metrics.map((metric) => (
          <li key={metric._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>Date:</strong> {new Date(metric.date).toLocaleDateString()} | <strong>Weight:</strong> {metric.weight}kg | <strong>BMI:</strong> {metric.bmi} | <strong>Hydration Level:</strong> {metric.hydrationLevel}%
            </div>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(metric._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthMetrics;
