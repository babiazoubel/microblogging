import React from 'react';
import './Button.css';

const Button = ({ children, onClick, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="button"
    >
      {children}
    </button>
  );
};

export default Button;