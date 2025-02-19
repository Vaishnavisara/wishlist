import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const search = useLocation().search;
  const listId = new URLSearchParams(search).get("listId"); // Get listId from the URL

  useEffect(() => {
    if (listId) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/tasks/${listId}`);
          setTasks(response.data); // Store fetched tasks in state
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };

      fetchTasks();
    }
  }, [listId]); // Fetch tasks whenever the listId changes

  // Add a new task to the list
  const addTask = async () => {
    try {
      await axios.post("http://localhost:8000/tasks/create", {
        list_id: listId,
        description: newTask,
      });
      setNewTask(""); // Reset the input field
      const response = await axios.get(`http://localhost:8000/tasks/${listId}`);
      setTasks(response.data); // Refresh tasks
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Mark task as completed
  const completeTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:8000/tasks/${taskId}/complete`);
      const response = await axios.get(`http://localhost:8000/tasks/${listId}`);
      setTasks(response.data); // Refresh tasks
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  return (
    <div>
      <h3>Todo List for List ID: {listId}</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.description}
            </span>
            {!task.completed && (
              <button onClick={() => completeTask(task.id)}>Complete</button>
            )}
          </li>
        ))}
      </ul>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

export default TodoList;
