import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';

const Profile = (props) => {
  const { name, isValid, isDisabled, isLoading, loadingText, buttonText, onBurgerButtonClick } = props;

  return (
    <>
      <Header onClick={onBurgerButtonClick} />
      <main>
        <section className="profile">
          <h1 className="profile__title">Привет, Иван {name}!</h1>
          <form
            id="form"
            className="profile__form"
            // onSubmit={handleSubmit}
            noValidate
          >
            <label
              className="profile__form-label"
              htmlFor="name"
            >
              <span className="profile__form-text">Имя</span>
              <input
                placeholder="Введите Имя"
                name="name"
                className="profile__input"
                id="name-input"
                type="text"
                autoComplete="off"
                minLength="2"
                maxLength="40"
                required={true}
                // onChange={handleChange}
                // value={values.name || ''}
              />
            </label>
            <label
              className="profile__form-label"
              htmlFor="email"
            >
              <span className="profile__form-text">E-mail</span>
              <input
                placeholder="Введите E-mail"
                name="email"
                className="profile__input"
                id="email-input"
                type="email"
                autoComplete="off"
                minLength="2"
                maxLength="40"
                required
                // onChange={handleChange}
                // value={values.email || ''}
              />
            </label>
            <span className="profile__input-error">При обновлении профиля произошла ошибка.</span>

            {/* <button
            className={`profile__form-button-save
            //${!isValid || isDisabled ? 'profile__form-button-save_disabled' : ''}
            `}
            type="submit"
            disabled={!isValid || isDisabled}
            >
            Сохранить{isLoading ? loadingText : buttonText}
          </button> */}

            <button
              type="submit"
              className="profile__form-button-edit"
            >
              Редактировать
            </button>

            {/* <button
            type="submit"
            className="profile__form-button-sign-out"
          > */}
            <Link
              className="profile__form-button-sign-out-link"
              to="/"
            >
              Выйти из аккаунта
            </Link>
            {/* </button> */}
          </form>
        </section>
      </main>
    </>
  );
};

export default Profile;
