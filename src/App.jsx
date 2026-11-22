import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem('tasks')) || []
  })

  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function addTask(e) {
    if (e.key === 'Enter' && input.trim() !== '') {
      e.preventDefault()

      setTasks([
        ...tasks,
        { id: Date.now(), text: input.trim(), completed: false }
      ])

      setInput('')
    }
  }

  function toggleTask(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  function editTask(id) {
    const newText = prompt('Edit your task:')

    if (newText && newText.trim()) {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, text: newText.trim() } : task
      ))
    }
  }

  return (
    <div className="app">
      <div className="left">
        <h2>TASK LIST</h2>

        <p className="description">
          Add tasks to your list by typing to the right and pressing enter.
          You may then view pending tasks below.
        </p>

        <div className="taskList">
          {tasks.map(task => (
            <div className="task" key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />

              <span className={task.completed ? 'completed' : ''}>
                {task.text}
              </span>

              <div className="buttons">
                <button onClick={() => editTask(task.id)} title="Edit">✏️</button>
                <button onClick={() => deleteTask(task.id)} title="Delete">✖</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="right">
        <h1>I need to...</h1>

        <textarea
          placeholder="Add a task..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={addTask}
        />
      </div>
    </div>
  )
}

export default App