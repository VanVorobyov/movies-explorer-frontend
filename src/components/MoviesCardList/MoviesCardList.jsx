import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

import {
  LAPTOP_MOVIES_NUMBER,
  TABLET_MOVIES_NUMBER,
  MOBILE_MOVIES_NUMBER,
  ADDED_LAPTOP_MOVIES_NUMBER,
  ADDED_TABLET_MOVIES_NUMBER,
  ADDED_MOBILE_MOVIES_NUMBER,
} from '../../utils/constants';

const MoviesCardList = ({ isLoading, movies, searchMovies, savedMovies, onSaveMovie, onMovieDelete }) => {
  const path = useLocation().pathname;
  const isSavedMovies = path === '/saved-movies';

  const [isNumberOfMovies, setNumberOfMovies] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const isMovieSaved = (movie, savedMovies) => {
    return savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
  };

  const handleNumberOfMovies = () => {
    const display = window.innerWidth;
    if (display > 1023) {
      setNumberOfMovies(isNumberOfMovies || LAPTOP_MOVIES_NUMBER);
    } else if (display > 698) {
      setNumberOfMovies(isNumberOfMovies || TABLET_MOVIES_NUMBER);
    } else {
      setNumberOfMovies(isNumberOfMovies || MOBILE_MOVIES_NUMBER);
    }
  };

  const handleShowMore = () => {
    const display = window.innerWidth;
    if (display > 1023) {
      setNumberOfMovies(isNumberOfMovies + ADDED_LAPTOP_MOVIES_NUMBER);
    } else if (display > 698) {
      setNumberOfMovies(isNumberOfMovies + ADDED_TABLET_MOVIES_NUMBER);
    } else {
      setNumberOfMovies(isNumberOfMovies + ADDED_MOBILE_MOVIES_NUMBER);
    }
  };

  useEffect(() => {
    handleNumberOfMovies();
  }, []);

  useEffect(() => {
    const display = window.innerWidth;
    if (display > 1023) {
      setNumberOfMovies(LAPTOP_MOVIES_NUMBER);
    } else if (display > 698) {
      setNumberOfMovies(TABLET_MOVIES_NUMBER);
    } else {
      setNumberOfMovies(MOBILE_MOVIES_NUMBER);
    }
  }, [movies]);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', handleNumberOfMovies);
    }, 500);
  });

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__content">
        {isLoading ? (
          <Preloader />
        ) : (
          <ul className="movies-cards">
            {isSavedMovies && (
              <>
                {savedMovies
                  ? savedMovies.map((movie) => {
                      return (
                        <MoviesCard
                          key={movie._id}
                          movie={movie}
                          movies={movies}
                          savedMovies={savedMovies}
                          isSaved={!isSaved}
                          setIsSaved={setIsSaved}
                          onMovieDelete={onMovieDelete}
                        />
                      );
                    })
                  : []}
              </>
            )}
            {!isSavedMovies && (
              <>
                {movies
                  ? movies.slice(0, isNumberOfMovies).map((movie) => {
                      const isMovieInSaved = isMovieSaved(movie, savedMovies);
                      return (
                        <MoviesCard
                          key={movie.id}
                          movie={movie}
                          movies={movies}
                          savedMovies={savedMovies}
                          isSaved={isMovieInSaved}
                          setIsSaved={setIsSaved}
                          onSaveMovie={onSaveMovie}
                        />
                      );
                    })
                  : []}
              </>
            )}
          </ul>
        )}
        <button
          type="button"
          className={`movies-card-list__button ${
            (isSavedMovies || (movies && movies.length <= isNumberOfMovies)) && 'movies-card-list__button_hidden'
          }`}
          onClick={handleShowMore}
        >
          Ещё
        </button>
      </div>
    </section>
  );
};

export default MoviesCardList;
