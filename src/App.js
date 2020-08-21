import React, { useState, useEffect } from "react";
import Timer from "timer.js"
import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeRemaining, setTimeRemaining] = useState(25*60);
  const [isActive, setIsActive] = useState(false)
  const [isSession, setIsSession] = useState(true)

  const formatTime = seconds => new Date(seconds * 1000).toISOString().substr(14, 5)

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeRemaining(timeRemaining => timeRemaining - 1);
      }, 1000);
    } else if (!isActive || timeRemaining === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

// const startClock = () => {
//   timerJS.start(sessionLength)
//   setIsActive(true)
//   const clock = setInterval(()=>{setTimeRemaining(prevState=>prevState-1)},1000)
//   if (isActive) {
//     clearInterval(clock)
//   }
// }
  

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Pomodoro Clock</h1>
        <div className="break-controls">
          <h2 className="option-label">Break Length</h2>
          <button id="break-decrement" onClick={()=>setBreakLength((prevState)=>prevState-1)}>Decrease</button>
          <p id="break-length">{breakLength}</p>
          <button id="break-increment" onClick={()=>setBreakLength((prevState)=>prevState+1)}>Increase</button>
        </div>
        <div classname="session-controls">
          <h2 className="option-label">Session Length</h2>
          <button id="session-decrement" onClick={()=>setSessionLength((prevState)=>prevState-1)}>Decrase</button>
          <p id="session-length">{sessionLength}</p>
          <button id="session-increment" onClick={()=>setSessionLength((prevState)=>prevState+1)}>Increase</button>
        </div>
        <div className="timer-container">
          <h2 id="timer-label">Time Remaining</h2>
          <p id="time-left">{formatTime(timeRemaining)}</p>
          <button id="start" onClick={()=>setIsActive(!isActive)}>Toggle Timer</button>
          <button id="start" >Start Timer</button>
        </div>
      </header>
    </div>
  );
}

export default App;
