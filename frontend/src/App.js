import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // ✅ Your LIVE backend URL
  const API = "https://task-mangerss.onrender.com";

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/tasks`);
      setTasks(res.data);
    } catch (err) {
      alert("Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      if (!title) return alert("Enter task");

      await axios.post(`${API}/tasks`, { title });
      setTitle("");
      fetchTasks();
    } catch {
      alert("Error adding task");
    }
  };

  const toggleTask = async (task) => {
    try {
      await axios.patch(`${API}/tasks/${task._id}`, {
        completed: !task.completed,
      });
      fetchTasks();
    } catch {
      alert("Error updating task");
    }
  };

  const updateTask = async (id) => {
    const newTitle = prompt("Enter new task");
    if (!newTitle) return;

    try {
      await axios.patch(`${API}/tasks/${id}`, {
        title: newTitle,
      });
      fetchTasks();
    } catch {
      alert("Error updating task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/tasks/${id}`);
      fetchTasks();
    } catch {
      alert("Error deleting task");
    }
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
              <button onClick={() => updateTask(task._id)}>✏️</button>

              <button onClick={() => toggleTask(task)}>✅</button>

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