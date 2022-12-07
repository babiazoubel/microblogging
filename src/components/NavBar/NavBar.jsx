import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="navbar">
      <NavLink to={'/'} className='link' >Home</NavLink>
      <NavLink to={'/profile'} className='link' >Profile</NavLink>
    </div>
  );
};

export default NavBar;
