import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  function addTask(e) {
    e.preventDefault();
    if (!task.trim()) return;

    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  return (
    <div className="todo-container">
      <div className="task-panel">
        <h2>TASK LIST</h2>
        <p className="instructions">
          Add tasks to your list by typing to the right and pressing enter.
          You may then view pending tasks below.
        </p>

        <div className="task-list">
          {tasks.map((item) => (
            <div className="task-item" key={item.id}>
              <span className={item.completed ? "completed" : ""}>
                {item.text}
              </span>

              <div className="task-actions">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(item.id)}
                />
                <button onClick={() => deleteTask(item.id)}>×</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="input-panel">
        <h1>I need to...</h1>

        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Add a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default App;