import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { filterMovies } from '../../utils/constants';
import useLocalStorage from '../../hooks/useLocalStorage';

import moviesApi from '../../utils/MoviesApi';

const Movies = (props) => {
  const { isLoggedIn, isLoading, setIsLoading, movies, setMovies, savedMovies, onSaveMovie, onMovieDelete, onBurgerButtonClick } = props;
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useLocalStorage('isShortMovies', false);
  const [searchMovies, setSearchMovies] = useState('');
  const [isQueryError, setIsQueryError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const handleSearchMovies = (value) => {
    setSearchMovies(value);
  };

  const handleSearch = (moviesArr) => {
    if (searchMovies.trim() === '') {
      setIsQueryError(true);
      setIsNotFound(false);
      setSearchedMovies([]);

      localStorage.removeItem('searchedMovies');
      localStorage.removeItem('searchMovies');
    } else {
      setIsQueryError(false);
      const searchedMovies = moviesArr.filter((movie) => movie.nameRU.toLowerCase().includes(searchMovies.toLowerCase().trim()));

      localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
      localStorage.setItem('searchMovies', JSON.stringify(searchMovies.trim()));

      setSearchedMovies(searchedMovies);

      if (isShortMovies) {
        localStorage.setItem('filteredMovies', JSON.stringify(filterMovies(searchedMovies)));
        setShortMovies(JSON.parse(localStorage.getItem('filteredMovies')));
      }
      if (searchedMovies.length === 0) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let localMovies = JSON.parse(localStorage.getItem('Movies'));
    if (movies.length === 0 && localMovies === null) {
      setIsLoading(true);
      moviesApi
        .getInitialCards()
        .then((initialCards) => {
          let movies = initialCards;
          setMovies(movies);
          localStorage.setItem('Movies', JSON.stringify(movies));
          handleSearch(movies);
        })
        .catch(() => {
          console.error(
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          );
          setIsQueryError(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      handleSearch(localMovies);
    }
  };

  const handleCheckboxClick = () => {
    setIsShortMovies((prev) => !prev);
  };

  const handleShortMovies = () => {
    localStorage.setItem('filteredMovies', JSON.stringify(filterMovies(searchedMovies)));
  };

  useEffect(() => {
    if (isShortMovies) {
      setShortMovies(JSON.parse(localStorage.getItem('filteredMovies')));
    } else {
      setShortMovies(searchedMovies);
    }
  }, [isShortMovies, searchedMovies]);

  useEffect(() => {
    const storedSearchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
    const storedSearchMovies = JSON.parse(localStorage.getItem('searchMovies'));

    if (storedSearchedMovies) {
      setSearchedMovies(storedSearchedMovies);
    }
    if (storedSearchMovies) {
      setSearchMovies(storedSearchMovies);
    }
  }, []);

  return (
    <>
      <Header
        onClick={onBurgerButtonClick}
        isLoggedIn={isLoggedIn}
      />
      <main>
        <SearchForm
          handleCheckboxClick={handleCheckboxClick}
          handleShortMovies={handleShortMovies}
          handleSubmit={handleSubmit}
          isShortMovies={isShortMovies}
          searchMovies={searchMovies}
          onSearchMovies={handleSearchMovies}
          isQueryError={isQueryError}
          onQueryError={setIsQueryError}
          isNotFound={isNotFound}
        />
        <MoviesCardList
          movies={isShortMovies ? shortMovies : searchedMovies}
          savedMovies={savedMovies}
          searchMovies={searchMovies}
          searchedMovies={searchedMovies}
          onSaveMovie={onSaveMovie}
          onMovieDelete={onMovieDelete}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </>
  );
};

export default Movies;
