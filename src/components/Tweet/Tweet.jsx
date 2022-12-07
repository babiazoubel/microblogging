import React from 'react';
import './Tweet.css';

const Tweet = ({ tweet }) => {
  return (
    <div className="tweet-container">
      <div className="tweet-name-date">
        <div>{tweet.userName}</div>
        <div>{tweet.date}</div>
      </div>
      <div className="tweet-content">{tweet.content} </div>
    </div>
  );
};

export default Tweet;
