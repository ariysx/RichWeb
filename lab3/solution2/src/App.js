import React, { useState, useEffect } from 'react';
import { interval, Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import './App.css';

function App() {
  const [time, setTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const [initialTime, setInitialTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if(!timerRunning) {
      setTime(initialTime);
    }
    
    const unsubscribe$ = new Subject();

    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (timerRunning) {
          if (time.seconds === '00') {
            if (time.minutes === '00') {
              if (time.hours === '00') {
                setTimerRunning(false);
              } else {
                setTime({
                  hours: time.hours - 1 < 10 ? `0${time.hours - 1}` : time.hours - 1,
                  minutes: '59',
                  seconds: '59'
                });
              }
            } else {
              setTime({
                hours: time.hours,
                minutes: time.minutes - 1 < 10 ? `0${time.minutes - 1}` : time.minutes - 1,
                seconds: '59'
              });
            }
          } else {
            setTime({
              hours: time.hours,
              minutes: time.minutes,
              seconds: time.seconds - 1 < 10 ? `0${time.seconds - 1}` : time.seconds - 1
            });
          }
        }
      });

    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    }
  }, [initialTime, time, timerRunning]);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Solution 2</h1>
        <p>
          Implement a count down timer similar using RxJs. The UI would look something like the
          following (taken from timer-tab.com – you can ignore the colours etc from image – this
          is just to get an idea of UI). The minutes update should ideally subscribe to the seconds
          and the hours likewise to the minutes.
        </p>
      </header>
      <div className="timer-container">
        <div className="timer-inputs">
          <input
            type="number"
            id="hours"
            placeholder="h"
            min="0"
            max="23"
            className="time-input"
            value={initialTime.hours}
            onChange={(event) => {
              setInitialTime({
                ...initialTime,
                hours: event.target.value > 23 ? '23' : event.target.value < 0 ? '00' : event.target.value < 10 ? `0${event.target.value}` : event.target.value
              });
            }}
            disabled={timerRunning}
          />
          <span>:</span>
          <input
            type="number"
            id="minutes"
            placeholder="m"
            min="0"
            max="59"
            className="time-input"
            value={initialTime.minutes}
            onChange={(event) => {
              setInitialTime({
                ...initialTime,
                minutes: event.target.value > 59 ? '59' : event.target.value < 0 ? '00' : event.target.value < 10 ? `0${event.target.value}` : event.target.value
              });
            }}
            disabled={timerRunning}
          />
          <span>:</span>
          <input
            type="number"
            id="seconds"
            placeholder="s"
            min="0"
            max="59"
            className="time-input"
            value={initialTime.seconds}
            onChange={(event) => {
              setInitialTime({
                ...initialTime,
                seconds: event.target.value > 59 ? '59' : event.target.value < 0 ? '00' : event.target.value < 10 ? `0${event.target.value}` : event.target.value
              });
            }}
            disabled={timerRunning}
          />
        </div>
        <button className="start-button" onClick={
          () => setTimerRunning(!timerRunning)
        }>
          {timerRunning ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="18px" height="18px">
                <path d="M0 0h24v24H0z" fill="black"/>
              </svg>
              <span>Stop countdown</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="18px" height="18px">

                <path d="M8 5v14l11-7z" fill="black" />
              </svg>
              <span>Start countdown</span>
            </>
          )}
        </button>
        <h1 className="countdown">
          {`${time.hours}:${time.minutes}:${time.seconds}`}
        </h1>
      </div>
    </div>
  );
}

export default App;
