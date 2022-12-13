import React, { useEffect, useState } from 'react';
import './Login.css';

import Button from '../../components/Button/Button';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, error: authError, loading } = useAuth();

  const handleClick = async (e) => {
    e.preventDefault();
    setError('');
    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <>
      <div className="container-profile">
        <div className="add-container-profile">
          <h1 className="title-profile">Login</h1>
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

          <div className="error-button-cointainer">
            {!loading && <Button onClick={handleClick}>Login</Button>}
            {loading && (
              <Button onClick={handleClick} disabled>
                Loading...
              </Button>
            )}
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;
