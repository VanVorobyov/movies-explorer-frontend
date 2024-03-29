import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import BurgerButton from '../BurgerButton/BurgerButton';
import logo from '../../images/header__logo.svg';

const Header = ({ isLoggedIn, onClick }) => {
  const path = useLocation().pathname;
  const isPromo = path === '/';
  const isMovies = path === '/movies';

  return (
    <header className={`header ${isPromo ? 'header_colored' : ''} `}>
      <div className={`header__content ${isMovies ? 'header__content_indent' : ''}`}>
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
          <Navigation
            isLoggedIn={isLoggedIn}
            isPromo={isPromo}
          />
        </div>
        {isLoggedIn && <BurgerButton onClick={onClick} />}
      </div>
    </header>
  );
};

export default Header;
