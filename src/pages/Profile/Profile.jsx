import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import { useAuthValue } from '../../contexts/AuthContext';
import './Profile.css';
import useAuth from '../../hooks/useAuth';


const Profile = () => {
  const { user } = useAuthValue();
  const { upload } = useAuth();

  const [photoURL, setPhotoURL] = useState(
    'https://gravatar.com/avatar/38bf22c2b3eb2af9079386aa94081dfd?s=400&d=mp&r=x'
  );
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleClick = () => {
    upload(photo, user, setLoading);
  };

  useEffect(() => {
    if (user && user.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [user]);

  return (
    <>
      <h1 className="title">Profile</h1>
      <div className="avatar-container">
        <img src={photoURL} alt="avatar" className="avatar-form"></img>
      </div>

      <div className="profile-container">
        <div className="profile-title">Current logged in as:</div>
        <div className="profile-box">
          <div className="profile-header">Username: </div>
          <div>{user.displayName}</div>
          <div className="profile-header">Email: </div>
          <div>{user.email}</div>
        </div>
        <div className="pick-file">
          <input type={'file'} onChange={handleChange} />
          <Button disabled={loading || !photo} onClick={handleClick}>
            Upload
          </Button>
        </div>
      </div>
    </>
  );
};

export default Profile;
