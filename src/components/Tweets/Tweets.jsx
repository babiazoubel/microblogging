import React from 'react';
import Tweet from '../Tweet/Tweet';

const Tweets = ({ tweets }) => {
  return (
    <>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </>
  );
};

export default Tweets;
