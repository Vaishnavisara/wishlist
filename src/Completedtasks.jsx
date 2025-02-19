
export default function Completedtasks({completedItems = [],setCompletedItems }) { 
      
      function handleRemoveCompletedTask(index) { 
        const updatedTasks = [...completedItems]; 
        updatedTasks.splice(index, 1); 
        setCompletedItems(updatedTasks);
      }
    
      return (
        <div>
            <ul>
              {completedItems.map((taskes, index2) => (
                <li key={index2}>{taskes.text || taskes} 
                 <button onClick={() => handleRemoveCompletedTask(index2)} id="removeBtn">remove</button>
                </li>
              ))}
            </ul>
        </div>
      );
    }
    