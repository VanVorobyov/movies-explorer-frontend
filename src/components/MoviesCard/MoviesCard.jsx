import React from 'react';
import './MoviesCard.css';
import image from '../../images/pic.png';

const MoviesCard = () => {
  return (
    <li className="card">
      <div className="card__title-wrap">
        <h2 className="card__title">В погоне за Бенкси</h2>
        <span className="card__duration">0ч 42м</span>
      </div>
      <img
        src={image}
        alt="Обложка фильма"
        className="card__image"
      />
      <button
        type="button"
        className="card__button"
      >
        Сохранить
      </button>
    </li>
  );
};

export default MoviesCard;
