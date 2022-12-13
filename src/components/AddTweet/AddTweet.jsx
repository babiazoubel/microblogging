import React, { useState } from 'react';
import { useAuthValue } from '../../contexts/AuthContext';

import './AddTweet.css';
import Button from '../Button/Button';
import { useTweet } from '../../hooks/useTweet';

const AddTweet = () => {
  const [body, setBody] = useState('');
  const [formError, setFormError] = useState('');
  const [tooLong, setTooLong] = useState(false);

  const { user } = useAuthValue();

  const { insertTweet, response } = useTweet('posts');

  const handleClick = (e) => {
    e.preventDefault();
    setFormError('');

    insertTweet({
      body,
      uid: user.uid,
      createdBy: user.displayName,
    });

    setBody('');
  };

  const handleChange = (e) => {
    setBody(e.target.value);
    if (body.length > 140) {
      setTooLong(true);
    } else {
      setTooLong(false);
    }
  };

  return (
    <>
      <form className="add-textarea-container">
        <textarea
          required
          onChange={handleChange}
          value={body}
          name="textarea"
          className="add-input-text"
          type="text"
          placeholder="What you have in mind..."
        ></textarea>
        <div className="error-button-cointainer">
          <div>
            {!body && !response.loading && (
              <Button onClick={handleClick} disabled>
                Tweet
              </Button>
            )}
            {body && !response.loading && (
              <Button onClick={handleClick}>Tweet</Button>
            )}

            {response.loading && (
              <Button onClick={handleClick} disabled>
                Wait...
              </Button>
            )}
          </div>
          <div>
            {tooLong && (
              <span className="create-message">
                The tweet can't contain more than 140 chars
              </span>
            )}
          </div>
          <div>
            {response.error && (
              <span className="create-message">{response.error}</span>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTweet;
