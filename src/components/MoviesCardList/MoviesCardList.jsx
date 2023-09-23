import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({ isLoading, movies, savedMovies, onSaveMovie, onMovieDelete }) => {
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
      setNumberOfMovies(12);
    } else if (display > 698) {
      setNumberOfMovies(8);
    } else {
      setNumberOfMovies(5);
    }
  };

  const handleShowMore = () => {
    const display = window.innerWidth;
    if (display > 1023) {
      setNumberOfMovies(isNumberOfMovies + 3);
    } else if (display > 698) {
      setNumberOfMovies(isNumberOfMovies + 2);
    } else {
      setNumberOfMovies(isNumberOfMovies + 1);
    }
  };

  useEffect(() => {
    handleNumberOfMovies();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', handleNumberOfMovies);
    }, 500);
  });

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__content">
        {isLoading ? (
          <Preloader /> // Show preloader if isLoading is true
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
