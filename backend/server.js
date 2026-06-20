const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Build Login Page",
    description: "Create responsive login page",
    status: "Pending",
    createdAt: "2026-06-20"
  },
  {
    id: 2,
    title: "Frontend Development",
    description: "Create responsive dashboard using React and CSS.",
    status: "In Progress",
    createdAt: "2026-06-20"
  },
  {
    id: 3,
    title: "Backend API Development",
    description: "Build CRUD APIs using Node.js and Express.",
    status: "Completed",
    createdAt: "2026-06-20"
  }
];

// GET ALL TASKS
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// ADD NEW TASK
app.post("/tasks", (req, res) => {
  const { title, description, status } = req.body;

  // Validation
  if (!title || title.trim() === "") {
    return res.status(400).json({
      message: "Title is required"
    });
  }

  if (!description || description.length < 20) {
    return res.status(400).json({
      message: "Description must be at least 20 characters"
    });
  }

  const newTask = {
    id: Date.now(),
    title,
    description,
    status,
    createdAt: new Date().toLocaleDateString()
  };

  tasks.push(newTask);

  res.status(201).json({
    message: "Task Added Successfully",
    task: newTask
  });
});

// COMPLETE TASK
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.map((task) =>
    task.id === id
      ? { ...task, status: "Completed" }
      : task
  );

  res.json({
    success: true,
    message: "Task Completed Successfully"
  });
});

// DELETE TASK
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.filter(
    (task) => task.id !== id
  );

  res.json({
    success: true,
    message: "Task Deleted Successfully"
  });
});

// START SERVER
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});