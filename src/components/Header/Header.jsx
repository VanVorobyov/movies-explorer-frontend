import './Header.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import BurgerButton from '../BurgerButton/BurgerButton';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import logo from '../../images/header__logo.svg';

const Header = ({ isLoggedIn, onClick }) => {
  const path = useLocation().pathname;
  const isPromo = path === '/';

  return (
    <header className={`header ${isPromo ? 'header_colored' : ''} `}>
      <div className="header__content">
        <Link
          className="header__logo"
          to="/"
        >
          <img
            src={logo}
            alt="Логотип"
          />
        </Link>
        <div className="header__navigation">
          <Navigation isLoggedIn={isLoggedIn} />
        </div>
        {!isPromo && <BurgerButton onClick={onClick} />}
      </div>
    </header>
  );
};

export default Header;
