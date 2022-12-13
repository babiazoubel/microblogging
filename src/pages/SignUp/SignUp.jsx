import React, { useEffect, useState } from 'react';
import './SignUp.css';
import Button from '../../components/Button/Button';
import useAuth from '../../hooks/useAuth';

const SignUp = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { createUser, error: authError, loading } = useAuth();

  const handleClick = async (e) => {
    e.preventDefault();
    setError('');
    const user = {
      displayName,
      email,
      password,
    };
    if (password !== confirmPassword) {
      setError('Passwords need to be the same');
      return;
    }

    const res = await createUser(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className="container-profile">
      <div className="add-container-profile">
        <h1 className="title-profile">Sign up</h1>
        <h4 className="sub-title-profile">User Name</h4>
        <form className="add-input-container">
          <input
            name="input"
            className="add-input"
            type="text"
            placeholder="What's your name?"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          ></input>
        </form>
        <h4 className="sub-title-profile">Email</h4>
        <form className="add-input-container">
          <input
            name="email"
            className="add-input"
            type="email"
            placeholder="What's your email?"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </form>
        <h4 className="sub-title-profile">Password</h4>
        <form className="add-input-container">
          <input
            name="password"
            className="add-input"
            type="password"
            placeholder="What's your password?"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </form>
        <h4 className="sub-title-profile">Confirm Password</h4>
        <form className="add-input-container">
          <input
            name="confirm-password"
            className="add-input"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></input>
        </form>
        <div className="error-button-cointainer">
          {!loading && <Button onClick={handleClick}>Save</Button>}
          {loading && <Button onClick={handleClick} disabled>Loading...</Button>}
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
