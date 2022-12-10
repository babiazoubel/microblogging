import { createContext } from 'react';

export const TweetContext = createContext();

export const TweetProvider = ({ children, value }) => {
  return <TweetContext.Provider value={value}>{children}</TweetContext.Provider>;
};
