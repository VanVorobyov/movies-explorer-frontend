import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../SearchForm/SearchForm';

const SavedMovies = () => {
  <>
    <Header />
    <SearchForm />
    <MoviesCardList />
    <Footer />
    <Preloader />
  </>;
};

export default SavedMovies;
