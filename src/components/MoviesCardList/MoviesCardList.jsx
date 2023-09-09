import { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ movies }) => {
  const [isNumberOfMovies, setNumberOfMovies] = useState(0);

  function handleNumberOfFilve() {
    const display = window.innerWidth;
    if (display > 1023) {
      setNumberOfMovies(12);
    } else if (display > 698) {
      setNumberOfMovies(8);
    } else {
      setNumberOfMovies(5);
    }
  }

  function handleShowMore() {
    const display = window.innerWidth;
    if (display > 1023) {
      setNumberOfMovies(isNumberOfMovies + 3);
    } else if (display > 698) {
      setNumberOfMovies(isNumberOfMovies + 2);
    } else {
      setNumberOfMovies(isNumberOfMovies + 1);
    }
  }

  useEffect(() => {
    handleNumberOfFilve();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', handleNumberOfFilve);
    }, 500);
  });

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__content">
        <ul className="movies-cards">
          {movies.slice(0, isNumberOfMovies).map((movie) => {
            return (
              <MoviesCard
                key={movie.id}
                movie={movie}
              />
            );
          })}
        </ul>
        <button
          type="button"
          className={`movies-card-list__button ${movies.length <= isNumberOfMovies && 'movies-card-list__button_hidden'}`}
          onClick={handleShowMore}
        >
          Ещё
        </button>
      </div>
    </section>
  );
};

export default MoviesCardList;
