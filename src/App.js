import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(59);
  const [timeRemaining, setTimeRemaining] = useState(25*60);
  const [isActive, setIsActive] = useState(false);
  const [isSession, setIsSession] = useState(true);

  const formatTime = (seconds) => {
    let time = new Date(seconds * 1000);
    if (time.getUTCHours() === 0){
      return time.toISOString().substr(14, 5);
    } else {
      return `${time.getUTCHours()*60+time.getMinutes()}:${time.toISOString().substr(17,2)}` //converts more than 1 hour to minutes
    }
  }

  useEffect(() => {
    let interval = null;
    if (timeRemaining === 0) {
      setTimeout(() => switchSession(), 1000);
    }
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((timeRemaining) => timeRemaining - 1);
      }, 1000);
    } else if (!isActive || timeRemaining < 0) {
      clearInterval(interval);
      switchSession();
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  const switchSession = () => {
    if (timeRemaining > 0) return;
    else {
      setIsSession((wasSession) => {
        //check what to set the time to
        if (wasSession === true) {
          setTimeRemaining(breakLength * 60);
        } else {
          setTimeRemaining(sessionLength * 60);
        }
        //toggle the session type
        return !wasSession;
      });
    }
  };

  const handleTimeChange = (toAdjust, change) => {
    switch (toAdjust) {
        case "session":
          if (sessionLength+change > 0 && sessionLength+change <= 60){
            setSessionLength((prevState) => prevState + change);
          }
          break;
        case "break":
          if (breakLength+change > 0 && breakLength+change <= 60){
            setBreakLength((prevState) => prevState + change);
          }
          break;
        default:
          console.error(
            "Uh oh... You're trying to adjust the clock in a way that's not correct"
          );
          break;
      }
  };

  useEffect(() => {
    if (!isActive) {
      if (isSession) {
        setTimeRemaining(sessionLength * 60); //converts mins to seconds
      } else {
        setTimeRemaining(breakLength * 60); //converts mins to seconds
      }
    }
  }, [sessionLength, breakLength]);

  const resetTimer = () => {
    setIsActive(false);
    setIsSession(true);
    setSessionLength(25);
    setBreakLength(5);
    setTimeRemaining(25 * 60);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Pomodoro Clock</h1>
        <div className="break-controls">
          <h2 className="option-label">Break Length</h2>
          <button
            id="break-decrement"
            onClick={() => handleTimeChange("break", -1)}
            disabled={isActive}
          >
            Decrease
          </button>
          <p id="break-length">{breakLength}</p>
          <button
            id="break-increment"
            onClick={() => handleTimeChange("break", 1)}
            disabled={isActive}
          >
            Increase
          </button>
        </div>
        <div className="session-controls">
          <h2 className="option-label">Session Length</h2>
          <button
            id="session-decrement"
            onClick={() => handleTimeChange("session", -1)}
            disabled={isActive}
          >
            Decrease
          </button>
          <p id="session-length">{sessionLength}</p>
          <button
            id="session-increment"
            onClick={() => handleTimeChange("session", 1)}
            disabled={isActive}
          >
            Increase
          </button>
        </div>
        <div className="timer-container">
          <h2 id="timer-label">Time Remaining</h2>
          <p id="time-left">{formatTime(timeRemaining)}</p>
          <button id="start" onClick={() => setIsActive(!isActive)}>
            Toggle Timer
          </button>
          <button id="start" onClick={resetTimer}>
            Reset Timer
          </button>
          <button
            onClick={() => {
              setTimeRemaining(1);
            }}
          >
            Set time to 1s
          </button>
          <p>{isSession ? "session" : "break"}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
