import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './BurgerMenu.css';
import account_icon from '../../images/account__icon.svg';

const BurgerMenu = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      // className={`burger-menu burger-menu_opened`}
      className={`burger-menu ${isOpen ? 'burger-menu_opened' : ''}`}
      onClick={handleOverlay}
    >
      <nav className="burger-menu__nav">
        <button
          className="burger-menu__nav-button-close"
          type="button"
          onClick={onClose}
        />
        <div className="burger-menu__nav-wrap">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'burger-menu__nav-link burger-menu__nav-link_active' : 'burger-menu__nav-link')}
            onClick={onClose}
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? 'burger-menu__nav-link burger-menu__nav-link_active' : 'burger-menu__nav-link')}
            onClick={onClose}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={({ isActive }) => (isActive ? 'burger-menu__nav-link burger-menu__nav-link_active' : 'burger-menu__nav-link')}
            onClick={onClose}
          >
            Сохранённые фильмы
          </NavLink>
        </div>

        <NavLink
          to="/profile"
          className="burger-menu__nav-link"
        >
          <button
            type="button"
            className="burger-menu__nav-account-button"
            onClick={onClose}
          >
            <span className="burger-menu__nav-account-text">Аккаунт</span>
            <img
              src={account_icon}
              alt="Иконка аккаунта"
              className="burger-menu__nav-account-icon"
            />
          </button>
        </NavLink>
      </nav>
    </div>
  );
};

export default BurgerMenu;
