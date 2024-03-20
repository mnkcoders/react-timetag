import { useState, useRef } from 'react'
import './App.css'

const Timer = () => {

  const handleClick =  () => {

    return true;
  };

  const caption = () => {

    return '';
  };

  //timer button
  return (<button className="timer btn" onClick={handleClick}>{caption()}</button>);
};


const App = () => {
  const [timerState, setTimerState] = useState('READY');
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [tasks, setTasks] = useState([]);

  const intervalRef = useRef(null);

  const startTimer = () => {
    setStartTime(new Date());
    setTimerState('ACTIVE');
    intervalRef.current = setInterval(() => {
      // Update timer every second
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setStopTime(new Date());
    setTimerState('STOPPED');
  };

  const saveTask = () => {
    const task = {
      startTime,
      stopTime,
      // Add more properties for categorization and tagging
    };
    setTasks([...tasks, task]);
    localStorage.setItem('tasks', JSON.stringify([...tasks, task]));
    setTimerState('READY');
    setStartTime(null);
    setStopTime(null);
  };

  return (
    <div>
      <button onClick={() => {
        if (timerState === 'READY') startTimer();
        else if (timerState === 'ACTIVE') stopTimer();
        else if (timerState === 'STOPPED') saveTask();
      }}>
        {timerState === 'ACTIVE' ? 
          (new Date() - startTime) / 1000 + 's' :
          (timerState === 'READY' ? 'Start new job' : 'SAVE')}
      </button>
      <div>
        <h2>Saved Tasks</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task.startTime.toString()} - {task.stopTime.toString()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App
