import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
// import Preloader from '../Preloader/Preloader';

const SavedMovies = ({ movies }) => {
  return (
    <>
      <Header />
      <SearchForm />
      <MoviesCardList movies={movies} />
      <Footer />
      {/* <Preloader /> */}
    </>
  );
};

export default SavedMovies;
