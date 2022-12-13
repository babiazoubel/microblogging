import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthValue } from '../../contexts/AuthContext';
import useAuth from '../../hooks/useAuth';
import Button from '../Button/Button';
import './NavBar.css';

const NavBar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuth();
  console.log(user);

  return (
    <div className="navbar">
      {user && (
        <>
          <NavLink to={'/'} className="link">
            Home
          </NavLink>
          <NavLink to={'/profile'} className="link">
            Profile
          </NavLink>
        </>
      )}
      {!user && (
        <>
          <NavLink to={'/login'} className="link">
            Login
          </NavLink>
          <NavLink to={'/signup'} className="link">
            Sign Up
          </NavLink>
        </>
      )}
      {user && (
        <div className="link">
          <Button onClick={logout}>Logout</Button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
