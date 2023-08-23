import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';
// import Navigation from '../Navigation/Navigation';
import logo from '../../images/header__logo.svg';
// import account_icon from '../../images/account__icon.svg';

const Header = () => {
  return (
    <header className="header header_colored">
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
        {/* <Navigation /> */}
        <nav className="header__auth">
          <Link
            className="header__link"
            to="/sign-up"
          >
            Регистрация
          </Link>
          <Link
            className="header__link header__link_sign-in"
            to="/sign-in"
          >
            Войти
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
