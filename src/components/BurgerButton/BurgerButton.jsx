import React from 'react';
import './BurgerButton.css';

const BurgerButton = ({ onClick }) => {
  return (
    <button
      type="button"
      className="burger-menu-button"
      onClick={onClick}
    >
      <span className="burger-menu-button__line"></span>
      <span className="burger-menu-button__line"></span>
      <span className="burger-menu-button__line"></span>
    </button>
  );
};

export default BurgerButton;
