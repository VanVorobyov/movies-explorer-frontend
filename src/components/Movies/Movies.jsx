import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const Movies = (props) => {
  const { movies, onBurgerButtonClick } = props;
  return (
    <>
      <Header onClick={onBurgerButtonClick} />
      <main>
        <SearchForm />
        <MoviesCardList movies={movies} />
      </main>
      <Footer />
    </>
  );
};

export default Movies;
