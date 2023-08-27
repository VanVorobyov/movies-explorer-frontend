import React from 'react';

const Profile = () => {
  return (
    <div className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <div className="profile__wrapper">
        <div className="profile__label">
          <p className="profile__label-text">Имя</p>
          <p className="profile__label-text">Виталий</p>
        </div>
        <div className="profile__label">
          <p className="profile__label-text">E-mail</p>
          <p className="profile__label-text">pochta@yandex.ru</p>
        </div>
        <div className="profile__links">
          <button
            type="button"
            className="profile__link"
          >
            Редактировать
          </button>
          <button
            type="button"
            className="profile__link profile__link_exit"
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
