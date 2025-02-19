import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

export default function BucketList({ }) {
    const [task, setTask] = useState('');
    const tasksFromStorage = JSON.parse(localStorage.getItem('tasks')) || [];
    const validTasks = tasksFromStorage.filter(task => task.wish_id);  // ✅ Ensure `wish_id` exists
    const [tasks, setTasks] = useState(validTasks);


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const [editButton, setEditButton] = useState(null);
    const [changeValue, setChangeValue] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        if (task) {
            try {
                const response = await fetch("http://127.0.0.1:8000/bucketlist/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        wish: task,
                        user_id: 1,
                        status: false,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Failed to add task to BucketList");
                }

                const data = await response.json();
                console.log("🆕 Task added:", data);  // 🛑 Log API response

                if (!data.wish_id) {
                    console.error("❌ Error: API did not return wish_id!");
                    return;
                }

                setTasks([...tasks, { wish: task, wish_id: data.wish_id }]);

                setTask("");
            } catch (error) {
                console.error("❌ Error adding task to BucketList:", error);
            }
        }
    }


    async function handleRemove(index) {
        const taskToDelete = tasks[index]; // Get task object
        console.log("Deleting task:", taskToDelete);

        try {
            const response = await fetch(`http://127.0.0.1:8000/bucketlist/delete/${taskToDelete.wish_id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete task from BucketList");
            }

            console.log("Task deleted successfully");

            // 🔹 Update UI by removing the task
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }


    async function handleEdit(index) {
        const taskToUpdate = tasks[index];

        if (!taskToUpdate || !taskToUpdate.wish_id) {
            console.error("❌ Error: wish_id is undefined! Task:", taskToUpdate);
            return;
        }

        if (editButton === index) {
            if (!changeValue.trim()) {  // 🔹 Prevent empty wish update
                console.error("❌ Error: Empty wish value!");
                return;
            }

            console.log(`🔄 Updating Task ID: ${taskToUpdate.wish_id} with new wish: ${changeValue}`);

            try {
                const response = await fetch(`http://127.0.0.1:8000/bucketlist/update/${taskToUpdate.wish_id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ wish: changeValue.trim() }),
                });

                if (!response.ok) {
                    throw new Error("Failed to update task");
                }

                console.log("✅ Task updated in DB");

                // Update UI
                const updatedTasks = tasks.map((task, i) =>
                    i === index ? { ...task, wish: changeValue.trim() } : task
                );
                setTasks(updatedTasks);
                setEditButton(null);
            } catch (error) {
                console.error("❌ Error updating task:", error);
            }
        } else {
            // 🔹 Start editing mode and set input field value
            setEditButton(index);
            setChangeValue(taskToUpdate.wish);  // ✅ Pre-fill input with current task text
        }
    }


    async function handleChecked(index) {
        const getTask = tasks[index];
        console.log("Moving task to completedBucketlist:", getTask);

        try {
            const addResponse = await fetch("http://127.0.0.1:8000/wishlist/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    wish: getTask.wish,
                    user_id: 1,
                    status: true,
                }),
            });

            if (!addResponse.ok) {
                throw new Error("Failed to add task to completedBucketList");
            }

            console.log("Task added to completedBucketlist");

            const deleteResponse = await fetch(`http://127.0.0.1:8000/bucketlist/delete/${getTask.wish_id}`, {
                method: "DELETE",
            });

            if (!deleteResponse.ok) {
                throw new Error("Failed to remove task from bucketlist");
            }

            console.log("Task removed from bucketlist");

            setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));

        } catch (error) {
            console.error("Error moving task to completedBucketlist:", error);
        }
    }

    return (
        <div className="container">
            <div className="task-list">
                <ul>
                    {tasks.map((task, index) => (
                        <li key={task.wish_id}>
                            {editButton === index ? (
                                <input
                                    type="text"
                                    value={changeValue}
                                    onChange={(e) => setChangeValue(e.target.value)} // ✅ Update state
                                />
                            ) : (
                                <span className='spanText'>{task.wish}</span>  // ✅ Show text when not editing
                            )}
                            <div id='editBtn'>
                                <button onClick={() => handleEdit(index)}>
                                    {editButton === index ? "Save" : "Edit"}
                                </button>
                            </div>
                            <div id='deleteBtn'>
                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    onClick={() => handleRemove(index)}
                                />
                            </div>
                            <input type="checkbox" id='checkBtn' onChange={() => handleChecked(index)} />
                        </li>
                    ))}
                </ul>


            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={task}
                    onChange={(change) => setTask(change.target.value)}
                    placeholder="Enter your task here"
                />
                <button type="submit" id="submitBtn">Enter</button>
            </form>
        </div>
    );
}
