import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationAuth.css';

const NavigationAuth = () => {
  return (
    <nav className="nav__auth">
      <NavLink
        className="nav__auth-link"
        to="/signup"
      >
        Регистрация
      </NavLink>
      <NavLink
        className="nav__auth-link nav__auth-link_sign-in"
        to="/signin"
      >
        Войти
      </NavLink>
    </nav>
  );
};

export default NavigationAuth;
