import React, { createContext, useContext } from 'react';

const TweetContext = createContext();

export function TweetProvider({ children, value }) {
  return (
    <TweetProvider.Provider value={value}>{children}</TweetProvider.Provider>
  );
}

export function useTweetValue() {
  return useContext(TweetContext);
}
