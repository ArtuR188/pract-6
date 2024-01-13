import React, { useState, useRef } from 'react';
import './style.css';
import * as uuid from 'uuid';

const isArrayEqual = (selected, correct) => {
  if (selected.length !== correct.length) {
    return false;
  }
  return correct.filter(e => !selected.includes(e)).length === 0;
};

const MultiAnswerComponent = (props) => {
  const [userAttempts, setUserAttempts] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswer] = useState([]);

  const checkboxClick = (index, status) => {
    if (status) {
      setSelectedAnswer([...selectedAnswerIndex, index]);
    } else {
      setSelectedAnswer(selectedAnswerIndex.filter(e => e !== index));
    }

    wrongRef.current.classList.remove('selected');
    correctRef.current.classList.remove('selected');
  };

  const correctRef = useRef();
  const wrongRef = useRef();
  const showAnswerButtonRef = useRef();

  const checkOnClick = () => {
    if (isArrayEqual(selectedAnswerIndex, props.correctAnswer)) {
      correctRef.current.classList.add('selected');
      wrongRef.current.classList.remove('selected');
      showAnswerButtonRef.current.classList.remove('show');
    } else {
      wrongRef.current.classList.add('selected');
      correctRef.current.classList.remove('selected');
      showAnswerButtonRef.current.classList.remove('show');
      setUserAttempts(userAttempts + 1);
    }

    if (userAttempts >= 2) {
      showAnswerButtonRef.current.classList.add('show');
    }
  };

  const showAnswerOnClick = () => {
    setShowAnswer(true);
    setSelectedAnswer(props.correctAnswer);
  };

  return (
    <div className='question multi-answer'>
      <div><h3>{props.question}</h3></div>
      <div className='answers'>
        {props.answers.map((answer, i) => {
          const id = uuid.v1();
          const checked = props.correctAnswer.includes(i) && showAnswer;
          return (
            <div key={i}>
              <input
                id={id}
                type='checkbox'
                onClick={(e) => checkboxClick(i, e.currentTarget.checked)}
                defaultChecked={checked}
                checked={checked ? true : undefined}
                disabled={showAnswer}
              />
              {checked
                ? <label style={{ color: "#1aff00" }} htmlFor={id}>{answer}</label>
                : <label htmlFor={id}>{answer}</label>}
            </div>
          );
        })}
      </div>
      <div className='check'>
        <div className='button' onClick={checkOnClick}>
          check my answer
          <div ref={correctRef} className='correct'>correct</div>
          <div ref={wrongRef} className='wrong'>wrong</div>
        </div>

        <div className='showAnswer' onClick={showAnswerOnClick} ref={showAnswerButtonRef}>
          Show Answer
        </div>
      </div>
    </div>
  );
};

export default MultiAnswerComponent;
