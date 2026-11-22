import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState([])

  useEffect(() => {
    let interval

    if (running) {
      interval = setInterval(() => {
        setTime(prev => prev + 10)
      }, 10)
    }

    return () => clearInterval(interval)
  }, [running])

  function formatTime(ms) {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const milliseconds = Math.floor((ms % 1000) / 10)

    return (
      String(minutes).padStart(2, '0') +
      ':' +
      String(seconds).padStart(2, '0') +
      ':' +
      String(milliseconds).padStart(2, '0')
    )
  }

  function handleStartStop() {
    if (running) {
      setRunning(false)
    } else {
      setRunning(true)
    }
  }

  function handleLapReset() {
    if (running) {
      setLaps(prev => [formatTime(time), ...prev])
    } else {
      setTime(0)
      setLaps([])
    }
  }

  return (
    <div className="container">
      <label className="time">{formatTime(time)}</label>

      <div className="buttons">
        <button onClick={handleLapReset}>
          {running ? 'Lap' : 'Reset'}
        </button>

        <button
          className={running ? 'stop' : 'start'}
          onClick={handleStartStop}
        >
          {running ? 'Stop' : 'Start'}
        </button>
      </div>

      <ul className="laps">
        {laps.map((lap, index) => (
          <li key={index}>
            <span>Lap {laps.length - index}</span>
            <span>{lap}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App