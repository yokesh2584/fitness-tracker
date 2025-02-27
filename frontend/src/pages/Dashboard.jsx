import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [recentNutrition, setRecentNutrition] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const workoutsRes = await axios.get(
          "http://localhost:4000/api/workouts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const nutritionRes = await axios.get(
          "http://localhost:4000/api/nutrition",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const goalsRes = await axios.get("http://localhost:4000/api/goals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRecentWorkouts(workoutsRes.data.slice(0, 5));
        setRecentNutrition(nutritionRes.data.slice(0, 5));
        setGoals(goalsRes.data);
        console.log(goalsRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Dashboard</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Recent Workouts</h2>
              <ul className="list-group">
                {recentWorkouts.map((workout) => (
                  <li key={workout._id} className="list-group-item">
                    <strong>{workout.type}</strong> - {workout.duration} minutes
                    ({workout.intensity} intensity)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Recent Nutrition</h2>
              <ul className="list-group">
                {recentNutrition.map((entry) => (
                  <li key={entry._id} className="list-group-item">
                    <strong>{entry.food}</strong> - {entry.calories} calories
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Goals</h2>
              <ul className="list-group">
                {goals.map((goal) => (
                  <li key={goal._id} className="list-group-item">
                    <strong>{goal.type}</strong>: {goal.currentProgress} /{" "}
                    {goal.target}
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${
                            (goal.currentProgress / goal.target) * 100
                          }%`,
                        }}
                        aria-valuenow={goal.currentProgress}
                        aria-valuemin="0"
                        aria-valuemax={goal.target}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
