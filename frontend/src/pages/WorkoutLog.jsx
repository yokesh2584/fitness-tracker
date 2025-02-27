import { useState, useEffect } from "react";
import axios from "axios";

const WorkoutLog = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    type: "",
    duration: "",
    intensity: "Medium",
    caloriesBurned: "",
  });

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/api/workouts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWorkouts(res.data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewWorkout({ ...newWorkout, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:4000/api/workouts", newWorkout, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewWorkout({
        type: "",
        duration: "",
        intensity: "Medium",
        caloriesBurned: "",
      });
      fetchWorkouts();
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Workout Log</h1>
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Add New Workout</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="type" className="form-label">
                  Workout Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  name="type"
                  value={newWorkout.type}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="duration" className="form-label">
                  Duration (minutes)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="duration"
                  name="duration"
                  value={newWorkout.duration}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="intensity" className="form-label">
                  Intensity
                </label>
                <select
                  className="form-select"
                  id="intensity"
                  name="intensity"
                  value={newWorkout.intensity}
                  onChange={handleInputChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="caloriesBurned" className="form-label">
                  Calories Burned
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="caloriesBurned"
                  name="caloriesBurned"
                  value={newWorkout.caloriesBurned}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Workout
            </button>
          </form>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Recent Workouts</h2>
          <ul className="list-group">
            {workouts.map((workout) => (
              <li key={workout._id} className="list-group-item">
                <strong>{workout.type}</strong> - {workout.duration} minutes (
                {workout.intensity} intensity)
                {workout.caloriesBurned &&
                  ` - ${workout.caloriesBurned} calories burned`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WorkoutLog;
