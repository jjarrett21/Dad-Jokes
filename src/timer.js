// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

const timerStyle = css`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const time = css`
  font-size: 3rem;
  padding: 2rem;
`;

const button = css`
  padding: 0.6rem 1.5rem;
  margin: 0.4rem;
  border-radius: 3px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.8rem;
  border-style: groove;

  &:focus {
    outline-width: 0;
  }

  &:hover {
    background-color: #2641d4;
    border: 1px solid #1b1f2b;
  }

  &:active {
    background-color: #3151ff;
    border: 1px solid #152684;
    color: white;
  }

  &:inactive {
    background-color: #3151ff;
    border: 1px solid #152684;
    color: white;
  }
`;

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [open, setOpen] = useState(false);
  const [isActive, setActive] = useState(false);

  const toggle = () => {
    setActive(!isActive);
  };

  const reset = () => {
    setSeconds(0);
    setActive(false);
  };

  const tick = () => {
    let secondsInterval = null;
    if (isActive) {
      secondsInterval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 60000);
    } else if (!isActive && seconds !== 30) {
      clearInterval(secondsInterval);
    }

    if (seconds === 60 && isActive) {
      setOpen(true);
      setSeconds(0);
    }
  };

  useEffect(() => {
    tick();
    return () => clearInterval();
  }, [isActive, seconds]);

  return (
    <>
      <div css={timerStyle}>
        <h4>Phils Dad Joke Timer</h4>
        <div css={time}>{seconds} minutes</div>
        <div>
          <button css={button} onClick={toggle}>
            {isActive ? "Pause" : "Start"}
          </button>
          <button css={button} onClick={reset}>
            Reset
          </button>
        </div>
      </div>
      <div>
        <Modal centered size="lg" show={open} onHide={() => setOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {" "}
              Dad Joke timer has been released
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Phil you are now free to Dad joke around the country, please use
            your time wisely.
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Timer;
