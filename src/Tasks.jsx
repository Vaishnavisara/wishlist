import React, { useState, useEffect } from 'react';

export default function Tasks({ completedItems, setCompletedItems }) {
    const [item, setItem] = useState('');
    const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')) || []);

    useEffect(() => { 
        localStorage.setItem('items', JSON.stringify(items)); 
    }, [items]);

    const [editButton2, setEditButton2] = useState(null);
    const [changeValue2, setChangeValue2] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        if (item) {
            setItems([...items, item]);  
            setItem('');  
        }
    }

    function handleRemove(index2) {
        const updatedTasks = [...items];
        updatedTasks.splice(index2, 1);
        setItems(updatedTasks);
    }
   
    function handleEdit(index2) {
        if (editButton2 === index2) {
            const updatedTasks = [...items];
            updatedTasks[index2] = changeValue2;
            setItems(updatedTasks);
            setEditButton2(null);
        } else {
            setEditButton2(index2);
            setChangeValue2(items[index2]);
        }
    }
   
    function handleChecked(index2) {
        const getTask = items[index2];
        let isExist = completedItems.includes(getTask);
    
        if (!isExist) {
            setCompletedItems([...completedItems, getTask]);  
            const updatedTasks = [...items];
            updatedTasks.splice(index2, 1);
            setItems(updatedTasks);
        }
    }
    

    return (
        <div className="container">
            <div className="task-list">
                <ul>
                    {items.map((item, index2) => (
                        <li key={index2}>
                            {editButton2 === index2 ? (
                                <input
                                    type="text"
                                    value={changeValue2}
                                    onChange={(e) => setChangeValue2(e.target.value)}
                                />
                            ) : (
                                item
                            )}
                            <button onClick={() => handleRemove(index2)} id="removeBtn">remove</button>
                            <button onClick={() => handleEdit(index2)}>{editButton2 === index2 ? 'save' : 'edit'}</button>
                            <input
                                type="checkbox"
                                checked={completedItems.includes(item)}
                                onChange={() => handleChecked(index2)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={item}
                    onChange={(change) => setItem(change.target.value)}
                    placeholder="Enter your task here"
                />
                <button type="submit" id="submitBtn">Enter</button>
            </form>
          
        </div>
    );
}
