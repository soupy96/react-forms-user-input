import { useEffect, useRef, useState } from 'react';

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setenteredNameIsValid] = useState(false);
  const [enteredNameTouched, setenteredNameTouched] = useState(false);

  useEffect(() => {
    if (enteredNameIsValid) {
      console.log('Name Input is valid!');
    }
  }, [enteredNameIsValid]);

  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    setenteredNameTouched(true);

    if (enteredName.trim() === '') {
      setenteredNameIsValid(false);
      return;
    }

    setenteredNameIsValid(true);

    console.log(enteredName);

    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);

    // nameInputRef.current.value = ''; => THIS NOT IDEAL, DONT MANIP THE DOM, REACT DOES THAT
    setEnteredName('');
  };

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const nameInputClasses = nameInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          ref={nameInputRef}
          onChange={nameInputChangeHandler}
          type='text'
          id='name'
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className='error-text'>Name must not be empty</p>
        )}
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
