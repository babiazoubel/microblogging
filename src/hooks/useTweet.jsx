import { useEffect, useState, useReducer } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';


const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null };
    case 'INSERTED_DOC':
      return { loading: false, error: null };
    case 'ERROR':
      return { loading: false, error: action.payLoad };
    default:
      return state;
  }
};

export const useTweet = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertTweet = async (tweets) => {
    checkCancelBeforeDispatch({
      type: 'LOADING',
    });

    try {
      const newTweet = { ...tweets, createdAt: new Date().toISOString() };

      const insertedTweet = await addDoc(
        collection(db, docCollection),
        newTweet
      );

      checkCancelBeforeDispatch({
        type: 'INSERTED_DOC',
        payLoad: insertedTweet,
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: 'ERROR',
        payLoad: error.message,
      });
    }
  };

  //deal with memory leak
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    insertTweet,
    response,
  };
};
