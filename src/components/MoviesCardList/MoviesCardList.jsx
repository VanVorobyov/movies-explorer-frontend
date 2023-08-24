import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = () => {
  return (
    <section className="movies-card-list">
      <div className="movies-card-list__content">
        <ul className="movies-cards">
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </ul>
        <button
          type="button"
          className="movies-card-list__button"
        >
          Ещё
        </button>
      </div>
    </section>
  );
};

export default MoviesCardList;
