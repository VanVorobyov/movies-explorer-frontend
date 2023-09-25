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
  const [visibleMovies, setVisibleMovies] = useState([]);

  const isMovieSaved = (movie, savedMovies) => {
    return savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
  };

  const handleNumberOfMovies = () => {
    const display = window.innerWidth;
    if (display > 1023) {
      setNumberOfMovies(isNumberOfMovies || 12);
    } else if (display > 698) {
      setNumberOfMovies(isNumberOfMovies || 8);
    } else {
      setNumberOfMovies(isNumberOfMovies || 5);
    }
  };

  const handleShowMore = () => {
    const display = window.innerWidth;
    if (display > 1023) {
      setNumberOfMovies(isNumberOfMovies + 3);
    } else if (display > 698) {
      setNumberOfMovies(isNumberOfMovies + 2);
    } else {
      setNumberOfMovies(isNumberOfMovies + 2);
    }
  };

  useEffect(() => {
    handleNumberOfMovies();
  }, [movies]);

  useEffect(() => {
    handleNumberOfMovies();

    const handleResize = () => {
      handleNumberOfMovies();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const display = window.innerWidth;
    if (display > 1023) {
      setVisibleMovies(movies.slice(0, 12));
    } else if (display > 698) {
      setVisibleMovies(movies.slice(0, 8));
    } else {
      setVisibleMovies(movies.slice(0, 5));
    }
  }, [movies]);

  useEffect(() => {
    handleNumberOfMovies(); // Update the number of movies when component mounts
  }, [movies]); // Update the number of movies when movies change

  useEffect(() => {
    if (!isSavedMovies) {
      const display = window.innerWidth;
      if (display > 1023) {
        setVisibleMovies(movies.slice(0, isNumberOfMovies));
      } else if (display > 698) {
        setVisibleMovies(movies.slice(0, isNumberOfMovies));
      } else {
        setVisibleMovies(movies.slice(0, isNumberOfMovies));
      }
    }
  }, [isNumberOfMovies, movies, isSavedMovies]);

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
            {!isSavedMovies &&
              visibleMovies.map((movie) => {
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
                    onMovieDelete={onMovieDelete}
                  />
                );
              })}
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
