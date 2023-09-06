import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ movies }) => {
  return (
    <section className="movies-card-list">
      <div className="movies-card-list__content">
        <ul className="movies-cards">
          {movies.slice(0, 12).map((movie) => {
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
          className="movies-card-list__button "
        >
          Ещё
        </button>
      </div>
    </section>
  );
};

export default MoviesCardList;
