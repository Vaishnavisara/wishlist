import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

export default function BucketList() {
  // Load active tasks from localStorage or initialize as empty array
  const [activeTasks, setActiveTasks] = useState(() => {
    const savedTasks = localStorage.getItem("activeTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [task, setTask] = useState("");
  const [editButton, setEditButton] = useState(null);
  const [changeValue, setChangeValue] = useState("");

  // Save active tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
  }, [activeTasks]);

  // Add a new task
  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.trim()) {
      const newTask = {
        id: Date.now(), // Unique ID for each task
        wish: task.trim(),
      };
      setActiveTasks([...activeTasks, newTask]);
      setTask("");
    }
  };

  // Delete a task from active tasks
  const handleRemove = (id) => {
    setActiveTasks(activeTasks.filter((task) => task.id !== id));
  };

  // Edit a task in active tasks
  const handleEdit = (index) => {
    const taskToUpdate = activeTasks[index];
    if (editButton === index) {
      if (!changeValue.trim()) return alert("Task cannot be empty!");
      const updatedTasks = activeTasks.map((task, i) =>
        i === index ? { ...task, wish: changeValue.trim() } : task
      );
      setActiveTasks(updatedTasks);
      setEditButton(null);
    } else {
      setEditButton(index);
      setChangeValue(taskToUpdate.wish);
    }
  };

  // Move a task from activeTasks to completedTasks
  const handleChecked = (index) => {
    const taskToComplete = activeTasks[index];
    const updatedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    updatedCompletedTasks.push(taskToComplete);
    localStorage.setItem("completedTasks", JSON.stringify(updatedCompletedTasks));

    // Remove the task from activeTasks
    setActiveTasks(activeTasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <div className="task-list">
        <h2>Active Tasks</h2>
        <ul>
          {activeTasks.map((task, index) => (
            <li key={task.id}>
              {editButton === index ? (
                <input
                  type="text"
                  value={changeValue}
                  onChange={(e) => setChangeValue(e.target.value)}
                />
              ) : (
                <span className="spanText">{task.wish}</span>
              )}
              <div id="editBtn">
                <button onClick={() => handleEdit(index)}>
                  {editButton === index ? "Save" : "Edit"}
                </button>
              </div>
              <div id="deleteBtn">
                <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleRemove(task.id)} />
              </div>
              <input
                type="checkbox"
                id="checkBtn"
                onChange={() => handleChecked(index)}
              />
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task here"
        />
        <button type="submit" id="submitBtn">Enter</button>
      </form>
    </div>
  );
}