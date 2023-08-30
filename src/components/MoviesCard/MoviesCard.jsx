import { useState } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

import DurationConverter from '../../utils/DurationConverter';

const MoviesCard = (props) => {
  const { movie, onLikeClick } = props;

  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
  };

  const path = useLocation().pathname;
  const isSavedMovies = path === '/saved-movies';

  return (
    <li className="card">
      <div className="card__title-wrap">
        <h2 className="card__title">{movie.nameRU}</h2>
        <span className="card__duration">{DurationConverter(movie.duration)}</span>
      </div>
      <img
        src={`https://api.nomoreparties.co/${movie.image.url}`}
        alt="Обложка фильма"
        className="card__image"
      />

      <button
        type="button"
        className={`card__button ${isLiked && 'card__button_saved'} card__button_delete`}
        onClick={handleLikeClick}
      >
        Сохранить
      </button>
    </li>
  );
};

export default MoviesCard;
