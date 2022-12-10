import React, { useState, useEffect } from 'react';
import Button from '../components/Button/Button';
import NavBar from '../components/NavBar/NavBar';
import './Profile.css';

const Profile = () => {
  const [inputUserName, setInputUserName] = useState([]);
  const [userName, setUserName] = useState();

  const handleImputChange = (e) => {
    setInputUserName(e.target.value);
  };

  const handleAddUserNameClick = () => {
    if (inputUserName.length > 0) {
      handleTweetAdd(inputUserName);
    }
  };

  const handleTweetAdd = (userName) => {
    setUserName(userName);
    
  };

  useEffect(() => {
    localStorage.setItem('userName', JSON.stringify(userName));
  }, [userName]);

  return (
    <>
      <NavBar />
      <div className="container-profile">
        <div className="add-container-profile">
          <h1 className="title-profile">Profile</h1>
          <h4 className="sub-title-profile">User Name</h4>
          <form className="add-input-container">
            <input
              name="input"
              id="input"
              className="add-input"
              type="text"
              onChange={handleImputChange}
              value={inputUserName}
              placeholder="What's your name?"
            ></input>
          </form>
          <div className="error-button-cointainer">
            <div>
              <Button onClick={handleAddUserNameClick}>Save</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
