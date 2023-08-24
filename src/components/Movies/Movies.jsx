import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
// import Preloader from '../SearchForm/SearchForm';

const Movies = () => {
  return (
    <div>
      <Header />
      <SearchForm />
      <MoviesCardList />
      <Footer />
      {/* <Preloader /> */}
    </div>
  );
};

export default Movies;
