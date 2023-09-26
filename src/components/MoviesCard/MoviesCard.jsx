import { useState, useEffect } from 'react';
import './MoviesCard.css';
import { useLocation, Link } from 'react-router-dom';
import { convertDuration } from '../../utils/constants';

const MoviesCard = (props) => {
  const { movie, isSaved, savedMovies, onSaveMovie, onMovieDelete } = props;
  const path = useLocation().pathname;
  const isSavedMovies = path === '/saved-movies';

  const [isLiked, setIsLiked] = useState(isSaved);

  function handleSaveMovieClick() {
    if (isSaved) {
      const movieToDelete = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
      if (movieToDelete) {
        onMovieDelete(movieToDelete);
      }
    } else {
      onSaveMovie(movie);
    }
    setIsLiked(!isLiked);
  }

  function handleDeleteClick() {
    onMovieDelete(movie);
    setIsLiked(false);
  }

  useEffect(() => {
    if (isSaved) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [isSaved]);

  return (
    <li className="card">
      <div className="card__title-wrap">
        <h2 className="card__title">{movie.nameRU}</h2>
        <span className="card__duration">{convertDuration(movie.duration)}</span>
      </div>
      <Link
        target="_blank"
        to={movie.trailerLink}
      >
        <img
          src={isSavedMovies ? movie.image : `https://api.nomoreparties.co${movie.image.url}`}
          alt={`Обложка фильма ${movie.nameRU}`}
          className="card__image"
        />
      </Link>
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
          // disabled={isSaved}
        >
          {isLiked ? '' : 'Сохранить'}
        </button>
      )}
    </li>
  );
};

export default MoviesCard;
