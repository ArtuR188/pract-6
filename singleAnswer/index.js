import React, { useState, useRef } from 'react';
import './style.css';
import * as uuid from 'uuid';

const SingleAnswerComponent = (props) => {
  const [userAttempts, setUserAttempts] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswer] = useState(null);

  const radioClick = (index) => {
    setSelectedAnswer(index);
    resetSelectionStyles();
  };

  const correctRef = useRef();
  const wrongRef = useRef();
  const showAnswerButtonRef = useRef();

  const resetSelectionStyles = () => {
    wrongRef.current.classList.remove('selected');
    correctRef.current.classList.remove('selected');
    showAnswerButtonRef.current.classList.remove('show');
  };

  const checkOnClick = () => {
    if (selectedAnswerIndex === props.correctAnswer) {
      correctRef.current.classList.add('selected');
    } else {
      wrongRef.current.classList.add('selected');
      setUserAttempts(userAttempts + 1);
    }

    resetSelectionStyles();

    if (userAttempts >= 2) {
      showAnswerButtonRef.current.classList.add('show');
    }
  };

  const showAnswerOnClick = () => {
    setShowAnswer(true);
    setSelectedAnswer(props.correctAnswer);
    resetSelectionStyles();
  };

  const qId = uuid.v1();

  return (
    <div className='question single-answer'>
      <div>
        <h3>{props.question}</h3>
      </div>
      <div className='answers'>
        {props.answers.map((answer, i) => {
          const id = uuid.v1();
          const checked = showAnswer && selectedAnswerIndex === i;
          return (
            <div key={i}>
              <input
                id={id}
                type='radio'
                name={`group-${qId}`}
                onClick={() => radioClick(i)}
                defaultChecked={checked}
                checked={checked ? true : undefined}
              />
              {checked ? (
                <label style={{ color: "#1aff00" }} htmlFor={id}>
                  {answer}
                </label>
              ) : (
                <label htmlFor={id}>{answer}</label>
              )}
            </div>
          );
        })}
      </div>
      <div className='check'>
        <div className='button' onClick={checkOnClick}>
          check my answer
          <div ref={correctRef} className='correct'>
            correct
          </div>
          <div ref={wrongRef} className='wrong'>
            wrong
          </div>
        </div>

        <div className='showAnswer' onClick={showAnswerOnClick} ref={showAnswerButtonRef}>
          Show Answer
        </div>
      </div>
    </div>
  );
};

export default SingleAnswerComponent;
