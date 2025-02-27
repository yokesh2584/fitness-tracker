import React, { useState, useEffect } from "react";
import axios from "axios";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    type: "",
    target: "",
    endDate: "",
  });
  const [progressUpdate, setProgressUpdate] = useState({});

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/api/goals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGoals(res.data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewGoal({ ...newGoal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:4000/api/goals", newGoal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewGoal({
        type: "",
        target: "",
        endDate: "",
      });
      fetchGoals();
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const handleUpdateProgress = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const goal = goals.find((goal) => goal._id === id);
      const newProgress = Math.min(
        goal.currentProgress + parseFloat(progressUpdate[id] || 0),
        goal.target
      );

      await axios.patch(
        `http://localhost:4000/api/goals/${id}`,
        {
          currentProgress: newProgress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProgressUpdate({ ...progressUpdate, [id]: "" }); // Reset the input value
      fetchGoals();
    } catch (error) {
      console.error("Error updating goal progress:", error);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/api/goals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const handleProgressChange = (id, value) => {
    setProgressUpdate({ ...progressUpdate, [id]: value });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Goals</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              name="type"
              value={newGoal.type}
              onChange={handleInputChange}
              placeholder="Goal Type"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="target"
              value={newGoal.target}
              onChange={handleInputChange}
              placeholder="Target"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="date"
              name="endDate"
              value={newGoal.endDate}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3 w-100">
          Add Goal
        </button>
      </form>

      <h2 className="mb-3">Current Goals</h2>
      <ul className="list-group">
        {goals.map((goal) => (
          <li key={goal._id} className="list-group-item p-3">
            <h3 className="mb-2">{goal.type}</h3>
            <p>
              <strong>Target:</strong> {goal.target}
            </p>
            <p>
              <strong>Current Progress:</strong> {goal.currentProgress}
            </p>
            <p>
              <strong>End Date:</strong>{" "}
              {new Date(goal.endDate).toLocaleDateString()}
            </p>
            <input
              type="number"
              placeholder="Update Progress"
              className="form-control mt-2"
              value={progressUpdate[goal._id] || ""}
              onChange={(e) => handleProgressChange(goal._id, e.target.value)}
            />
            <button
              className="btn btn-success mt-2"
              onClick={() => handleUpdateProgress(goal._id)}
            >
              Update
            </button>
            <button
              className="btn btn-danger mt-2"
              onClick={() => handleDeleteGoal(goal._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Goals;
