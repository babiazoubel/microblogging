import React, { useState } from 'react';
import './AddInput.css';
import Button from '../Button/Button';

const AddInput = ({ handleTweetAdd }) => {
  const [inputData, setInputData] = useState('');
  const [tooLong, setTooLong] = useState(false);

  const handleImputChange = (e) => {
    setInputData(e.target.value);
    if (inputData.length > 140) {
      setTooLong(true);
    } else {
      setTooLong(false);
    }
  };

  const validate = () => {
    return inputData.length;
  };

  const handleAddTweetClick = () => {
    if (inputData.length > 0) {
      handleTweetAdd(inputData);
    }
    setInputData('');
  };

  return (
    <div className="add-container">
      <form className="add-textarea-container">
        <textarea
          required
          onChange={handleImputChange}
          value={inputData}
          name="textarea"
          id="textarea"
          className="add-input-text"
          type="text"
          placeholder="What you have in mind..."
        ></textarea>
        <div className="error-button-cointainer">
          <div>
            <Button onClick={handleAddTweetClick} disabled={!validate()}>
              Tweet
            </Button>
          </div>
          <div>
            {tooLong && (
              <span className="create-message">
                The tweet can't contain more than 140 chars
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddInput;