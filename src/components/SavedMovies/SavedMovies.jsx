import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const SavedMovies = (props) => {
  const { movies, savedMovies, onMovieDelete, onSaveMovie, onBurgerButtonClick } = props;
  return (
    <>
      <Header onClick={onBurgerButtonClick} />
      <main>
        <SearchForm />
        <MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          onMovieDelete={onMovieDelete}
        />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
