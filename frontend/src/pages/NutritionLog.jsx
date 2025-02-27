import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const NutritionLog = () => {
  const [nutritionEntries, setNutritionEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    food: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  useEffect(() => {
    fetchNutritionEntries();
  }, []);

  const fetchNutritionEntries = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/api/nutrition", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNutritionEntries(res.data);
    } catch (error) {
      console.error("Error fetching nutrition entries:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:4000/api/nutrition", newEntry, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewEntry({
        food: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
      });
      fetchNutritionEntries();
    } catch (error) {
      console.error("Error adding nutrition entry:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Nutrition Log</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              name="food"
              value={newEntry.food}
              onChange={handleInputChange}
              placeholder="Food Item"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="calories"
              value={newEntry.calories}
              onChange={handleInputChange}
              placeholder="Calories"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="protein"
              value={newEntry.protein}
              onChange={handleInputChange}
              placeholder="Protein (g)"
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="carbs"
              value={newEntry.carbs}
              onChange={handleInputChange}
              placeholder="Carbs (g)"
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="fat"
              value={newEntry.fat}
              onChange={handleInputChange}
              placeholder="Fat (g)"
              className="form-control"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Add Nutrition Entry
        </button>
      </form>

      <h2 className="mb-3">Recent Nutrition Entries</h2>
      <ul className="list-group">
        {nutritionEntries.map((entry) => (
          <li key={entry._id} className="list-group-item">
            <strong>{entry.food}</strong> - {entry.calories} calories
            {entry.protein && ` | Protein: ${entry.protein}g`}
            {entry.carbs && ` | Carbs: ${entry.carbs}g`}
            {entry.fat && ` | Fat: ${entry.fat}g`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NutritionLog;