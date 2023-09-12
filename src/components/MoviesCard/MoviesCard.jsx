import { useState, useEffect } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import DurationConverter from '../../utils/DurationConverter';

const MoviesCard = (props) => {
  const { movie, isSaved, setIsSaved, savedMovies, onSaveMovie, onMovieDelete } = props;
  const path = useLocation().pathname;
  const isSavedMovies = path === '/saved-movies';

  const [isLiked, setIsLiked] = useState(isSaved);

  function handleSaveMovieClick() {
    if (savedMovies.filter((m) => m.movieId === movie.id)) {
      setIsLiked(true);
      setIsSaved(true);
      onSaveMovie(movie);
    }
  }

  function handleDeleteClick() {
    onMovieDelete(movie);
    setIsSaved(false);
  }

  return (
    <li className="card">
      <div className="card__title-wrap">
        <h2 className="card__title">{movie.nameRU}</h2>
        <span className="card__duration">{DurationConverter(movie.duration)}</span>
      </div>
      <img
        src={isSavedMovies ? movie.image : `https://api.nomoreparties.co${movie.image.url}`}
        alt={`Обложка фильма ${movie.nameRU}`}
        className="card__image"
      />
      {isSavedMovies ? (
        <button
          type="button"
          className={`card__button card__button_delete`}
          onClick={handleDeleteClick}
        ></button>
      ) : (
        <button
          type="button"
          className={`card__button ${isLiked ? 'card__button_saved' : ''}`}
          onClick={handleSaveMovieClick}
          disabled={isSaved}
        >
          {isLiked ? '' : 'Сохранить'}
        </button>
      )}
    </li>
  );
};

export default MoviesCard;
