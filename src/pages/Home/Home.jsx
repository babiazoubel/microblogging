import React from 'react';
import AddTweet from '../../components/AddTweet/AddTweet';
import TweetList from '../../components/TweetList/TweetList';
import { useAuthValue } from '../../contexts/AuthContext';
import { useFetchDoc } from '../../hooks/useFetchDoc';

import './Home.css';

const Home = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts, loading } = useFetchDoc('posts', null, uid);

  console.log(posts)

  return (
    <>
      <h1 className="title">Micro Blogging Project</h1>
      <div className="add-container">
        <AddTweet />
        {loading && <p>Loading...</p>}
        {posts && posts.length === 0 && <div>Don't have tweets yet</div>}
        {posts && posts.map((post) => <TweetList key={post.id} post={post} />)}
      </div>
    </>
  );
};

export default Home;
