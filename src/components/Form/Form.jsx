import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';
import logo from '../../images/header__logo.svg';

const Form = (props) => {
  const { title, children, onSubmit, name, isValid, isDisabled, isLoading, loadingText, buttonText, link, text, linkText } = props;
  return (
    <div className="auth">
      <form
        action="#"
        method="post"
        className="auth__form"
        name="auth-form"
        autoComplete="off"
        noValidate
        onSubmit={onSubmit}
      >
        <Link
          className="auth__form-logo"
          to="/"
        >
          <img
            src={logo}
            alt="Логотип"
          />
        </Link>
        <h1 className="auth__form-title">{title}</h1>

        {children}

        <button
          className={`auth__form-button auth__form-button_${name}

          //${!isValid || isDisabled ? 'auth__form-button_disabled' : ''}
          `}
          type="submit"
          disabled={!isValid || isDisabled}
        >
          {isLoading ? loadingText : buttonText}
        </button>

        <div className="auth__form-text-wrap">
          <p className="auth__form-text">{text}</p>
          <Link
            to={link}
            className="auth__form-link"
          >
            {linkText}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Form;
