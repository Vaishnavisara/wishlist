import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function CompletedBucketList() {
  // Load completed tasks from localStorage or initialize as empty array
  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedTasks = localStorage.getItem("completedTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const handleUncheckTask = (task) => {
    // Remove the task from completedTasks
    const updatedCompletedTasks = completedTasks.filter((t) => t.id !== task.id);
    setCompletedTasks(updatedCompletedTasks);
    localStorage.setItem("completedTasks", JSON.stringify(updatedCompletedTasks));

    // Add the task back to activeTasks
    const activeTasks = JSON.parse(localStorage.getItem("activeTasks")) || [];
    activeTasks.push(task);
    localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
  };

  // Delete a task from completed tasks
  const handleRemoveCompletedBucket = (id) => {
    const updatedTasks = completedTasks.filter((task) => task.id !== id);
    setCompletedTasks(updatedTasks);
    localStorage.setItem("completedTasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="completedContainar">
      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id} id="completedTask">
            {/* Checkbox on the left */}
            <span>{task.wish}</span>
            <input
              type="checkbox"
              checked={true} // Since it's in the completed list, the checkbox is checked
              onChange={() => handleUncheckTask(task)} // Unchecking moves it back to BucketList
              style={{ marginRight: "10px" }} // Add some spacing
            />
            {/* Task text */}
            
            {/* Remove icon on the right */}
            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={() => handleRemoveCompletedBucket(task.id)}
              style={{ marginLeft: "10px", cursor: "pointer" }} // Add some spacing and pointer cursor
            />
          </li>
        ))}
      </ul>
    </div>
  );
}