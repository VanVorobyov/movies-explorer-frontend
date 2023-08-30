import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationMovies.css';
import account_icon from '../../images/account__icon.svg';

const NavigationMovies = () => {
  return (
    <nav className="nav__movies">
      <div className="nav__movies-wrap">
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? 'nav__movies-link-active' : 'nav__movies-link')}
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className={({ isActive }) => (isActive ? 'nav__movies-link-active' : 'nav__movies-link')}
        >
          Сохранённые фильмы
        </NavLink>
      </div>
      <NavLink
        to="/profile"
        className="nav__movies-link"
      >
        <button
          type="button"
          className="nav__movies-account-button"
        >
          <span className="nav__movies-account-text">Аккаунт</span>
          <img
            src={account_icon}
            alt="Иконка аккаунта"
            className="nav__movies-account-icon"
          />
        </button>
      </NavLink>
    </nav>
  );
};

export default NavigationMovies;
