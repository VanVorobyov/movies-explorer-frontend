import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import FilterMovies from '../../utils/FilterMovies';
import useLocalStorage from '../../hooks/useLocalStorage';

const SavedMovies = (props) => {
  const { isLoading, movies, savedMovies, onMovieDelete, onBurgerButtonClick } = props;

  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShortSavedMovies, setIsShortSavedMovies] = useLocalStorage('isShortSavedMovies', false);
  const [shortSavedMovies, setShortSavedMovies] = useState([]);
  const [isQueryError, setIsQueryError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const handleSavedCheckboxClick = () => {
    setIsShortSavedMovies((prev) => !prev);
  };

  useEffect(() => {
    if (searchedSavedMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [searchedSavedMovies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setIsQueryError(true);
      setSearchedSavedMovies(savedMovies);
      localStorage.setItem('searchedSavedMovies', JSON.stringify(savedMovies));
      localStorage.setItem('filteredSavedMovies', JSON.stringify(FilterMovies(savedMovies)));
      localStorage.removeItem('searchQuery');
    } else {
      setIsQueryError(false);
      const searchedSavedMovies = savedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase().trim()));

      localStorage.setItem('searchQuery', JSON.stringify(searchQuery.trim()));
      localStorage.setItem('searchedSavedMovies', JSON.stringify(searchedSavedMovies));
      localStorage.setItem('filteredSavedMovies', JSON.stringify(FilterMovies(searchedSavedMovies)));

      if (isShortSavedMovies) {
        setShortSavedMovies(JSON.parse(localStorage.getItem('filteredSavedMovies')));
      }
    }
  };

  useEffect(() => {
    const filteredMovies = savedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase().trim()));

    if (isShortSavedMovies) {
      const filteredShortMovies = FilterMovies(filteredMovies);
      setShortSavedMovies(filteredShortMovies);
      localStorage.setItem('filteredSavedMovies', JSON.stringify(filteredShortMovies));
    } else {
      setSearchedSavedMovies(filteredMovies);
      localStorage.setItem('filteredSavedMovies', JSON.stringify(filteredMovies));
    }
  }, [savedMovies, searchQuery, isShortSavedMovies]);

  useEffect(() => {
    const storedSearchQuery = JSON.parse(localStorage.getItem('searchQuery'));
    if (storedSearchQuery) {
      setSearchQuery(storedSearchQuery);
    }
  }, []);

  const handleSearchMovies = (value) => {
    setSearchQuery(value);
    localStorage.setItem('searchQuery', JSON.stringify(value));
  };

  return (
    <>
      <Header onClick={onBurgerButtonClick} />
      <main>
        <SearchForm
          handleSavedCheckboxClick={handleSavedCheckboxClick}
          handleSubmit={handleSubmit}
          isShortSavedMovies={isShortSavedMovies}
          searchMovies={searchQuery}
          onSearchMovies={handleSearchMovies}
          isQueryError={isQueryError}
          onQueryError={setIsQueryError}
          savedMovies={savedMovies}
          isNotFound={isNotFound}
        />
        <MoviesCardList
          movies={movies}
          savedMovies={isShortSavedMovies ? shortSavedMovies : searchedSavedMovies}
          onMovieDelete={onMovieDelete}
          isShortSavedMovies={isShortSavedMovies}
          setShortSavedMovies={setShortSavedMovies}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
