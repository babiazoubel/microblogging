import { useEffect, useState } from 'react';
import AddInput from '../AddInput/AddInput';
import Tweets from '../Tweets/Tweets';

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import './App.css';
import NavBar from '../NavBar/NavBar';

function App() {
  const baseUrl =
    'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet';
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTweet = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(baseUrl);
      setIsLoading(false);
      setTweets(data.tweets);
      if (!data.ok) {
        throw new Error('Ops! Something went wrong');
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTweet();
  }, []);

  const userName = JSON.parse(localStorage.getItem('userName')) ;

  const handleTweetAdd = (tweetText) => {
    const date = new Date();
    axios
      .post(baseUrl, {
        content: tweetText,
        userName: userName,
        date: date.toISOString(),
        id: uuidv4(),
      })
      .then(fetchTweet);
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="title">Micro Blogging Project</h1>
        <AddInput handleTweetAdd={handleTweetAdd} />
        {isLoading && <p className="loading">Loading...</p>}
        {!isLoading && <Tweets tweets={tweets} />}
        {!isLoading && error && <p>{error}</p>}
      </div>
    </>
  );
}

export default App;