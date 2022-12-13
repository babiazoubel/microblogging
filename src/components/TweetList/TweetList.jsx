import React from 'react';
import './TweetList.css';

const TweetList = ({ post }) => {

    
  return (
    <div className="tweet-container">
      <div className="tweet-name-date">
        <div>{post.createdBy}</div>
        <div>{post.createdAt.toString()}</div>
      </div>
      <div className="tweet-content">{post.body} </div>
    </div>
  );
};

export default TweetList;
