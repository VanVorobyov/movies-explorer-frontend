import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import useValidation from '../../hooks/useValidation';

const Profile = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const { isLoading, loadingText, buttonText, onBurgerButtonClick, onUpdateUser, onLogOut, isApiError, setIsApiError } = props;
  const { values, handleChange, isValid, errors, resetForm } = useValidation();

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isNotChange, setIsNotChange] = useState(false);
  const [isNotChangeInfo, setIsNotChangeInfo] = useState('');

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm]);

  useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      setIsNotChange(true);
      setIsNotChangeInfo('Измените имя или email для сохранения');
    } else {
      setIsNotChange(false);
      setIsNotChangeInfo('');
    }
  }, [values, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid && isSubmit) {
      onUpdateUser({
        name: values.name.trim(),
        email: values.email.trim(),
      });
      setIsSubmit(false);
      setIsEditing(false);
    }
  }
  return (
    <>
      <Header onClick={onBurgerButtonClick} />
      <main>
        <section className="profile">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form
            id="form"
            className="profile__form"
            onSubmit={handleSubmit}
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
                readOnly={!isEditing}
                onChange={handleChange}
                value={values.name || ''}
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
                readOnly={!isEditing}
                onChange={handleChange}
                value={values.email || ''}
              />
            </label>
            <span className="profile__input-error">{errors.name || errors.email || isApiError || (isEditing && isNotChangeInfo)}</span>

            {isEditing ? (
              <button
                type="submit"
                className={`profile__form-button-save ${!isValid || isNotChange ? 'profile__form-button-save_disabled' : ''}`}
                disabled={!isValid || isNotChange}
                onClick={() => {
                  setIsSubmit(true);
                }}
              >
                Сохранить{isLoading ? loadingText : buttonText}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="profile__form-button-edit"
                  // disabled={isNotChange}
                  onClick={() => {
                    setIsEditing(true);
                    setIsApiError('');
                  }}
                >
                  Редактировать
                </button>
                <Link
                  className="profile__form-button-sign-out-link"
                  to="/"
                  onClick={onLogOut}
                >
                  Выйти из аккаунта
                </Link>
              </>
            )}
          </form>
        </section>
      </main>
    </>
  );
};

export default Profile;
