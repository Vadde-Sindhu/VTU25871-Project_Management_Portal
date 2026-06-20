import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const completeTask = async (id) => {
    try {
      console.log("Completing Task:", id);

      await axios.put(`http://localhost:5000/tasks/${id}`, {
        status: "Completed",
      });

      fetchTasks();

      alert("Task Completed Successfully");
    } catch (error) {
      console.error("Complete Error:", error);
      alert("Failed to complete task");
    }
  };

  const deleteTask = async (id) => {
    try {
      console.log("Deleting Task:", id);

      await axios.delete(`http://localhost:5000/tasks/${id}`);

      fetchTasks();

      alert("Task Deleted Successfully");
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="dashboard">
      <h1 className="title">Task Dashboard</h1>

      <div className="top-bar">
        <button
          className="add-btn"
          onClick={() => navigate("/add-task")}
        >
          Add New Task
        </button>

        <select
          className="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      {tasks
        .filter((task) => {
          if (filter === "All") return true;
          return task.status === filter;
        })
        .map((task) => (
          <div className="task-card" key={task.id}>
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p
  className={`status ${task.status
    .replace(" ", "-")
    .toLowerCase()}`}
>
  Status: {task.status}
</p>

<p>
  Created: {task.createdAt || "20/06/2026"}
</p>
            <button
  className="complete-btn"
  disabled={task.status === "Completed"}
  onClick={() => completeTask(task.id)}
>
  {task.status === "Completed"
    ? "Completed"
    : "Complete Task"}
</button>

            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
            >
              Delete Task
            </button>
          </div>
        ))}
    </div>
  );
}

export default Dashboard;