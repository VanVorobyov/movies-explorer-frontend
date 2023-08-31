import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const SavedMovies = (props) => {
  const { movies, onBurgerButtonClick } = props;
  return (
    <>
      <Header onClick={onBurgerButtonClick} />
      <SearchForm />
      <MoviesCardList movies={movies} />
      <Footer />
    </>
  );
};

export default SavedMovies;
