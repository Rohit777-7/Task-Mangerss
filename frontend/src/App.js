import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks");
      setTasks(res.data);
    } catch {
      alert("Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      if (!title) return alert("Enter task");

      await axios.post("http://localhost:5000/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch {
      alert("Error adding task");
    }
  };

  // ✅ FIXED
  const toggleTask = async (task) => {
    await axios.patch(`http://localhost:5000/tasks/${task._id}`, {
      completed: !task.completed,
    });
    fetchTasks();
  };

  // ✅ FIXED
  const updateTask = async (id) => {
    const newTitle = prompt("Enter new task");
    if (!newTitle) return;

    await axios.patch(`http://localhost:5000/tasks/${id}`, {
      title: newTitle,
    });
    fetchTasks();
  };

  // ✅ FIXED
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>🚀 Task Manager</h1>

      <div className="input-box">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-card" key={task._id}>
            <span className={task.completed ? "completed" : ""}>
              {task.title}
            </span>

            <div className="actions">
              {/* ✅ FIXED */}
              <button onClick={() => updateTask(task._id)}>✏️</button>

              {/* ✅ FIXED */}
              <button onClick={() => toggleTask(task)}>✅</button>

              {/* ✅ FIXED */}
              <button
                className="delete"
                onClick={() => deleteTask(task._id)}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;