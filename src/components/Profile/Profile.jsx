import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

const Profile = (props) => {
  const { name, isValid, isDisabled, isLoading, loadingText, buttonText } = props;

  return (
    <>
      <Header />
      <section className="profile">
        <h3 className="profile__title">Привет, Иван {name}!</h3>
        <form
          id="form"
          className="profile__form"
          // onSubmit={handleSubmit}
          noValidate
        >
          <label className="profile__form-label">
            Имя
            <input
              name="name"
              className="profile__input"
              id="name-input"
              type="text"
              minLength="2"
              maxLength="40"
              required
              // onChange={handleChange}
              // value={values.name || ''}
            />
          </label>
          <label className="profile__form-label">
            E-mail
            <input
              name="email"
              className="profile__input"
              id="email-input"
              type="email"
              required
              // onChange={handleChange}
              // value={values.email || ''}
            />
          </label>
          <span className="profile__input-error">При обновлении профиля произошла ошибка.</span>

          {/* <button
            className={`profile__form-button-save ${!isValid || isDisabled ? 'profile__form-button-save_disabled' : ''}`}
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

          <button
            type="submit"
            className="profile__form-button-sign-out"
          >
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </>
  );
};

export default Profile;
