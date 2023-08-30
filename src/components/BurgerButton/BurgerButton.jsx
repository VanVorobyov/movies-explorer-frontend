import React from 'react';
import './BurgerButton.css';

const BurgerButton = ({ onClick }) => {
  return (
    <button
      type="button"
      className="burger-menu__button"
      onClick={onClick}
    >
      <span className="burger-menu__button-line"></span>
      <span className="burger-menu__button-line"></span>
      <span className="burger-menu__button-line"></span>
    </button>
  );
};

export default BurgerButton;
