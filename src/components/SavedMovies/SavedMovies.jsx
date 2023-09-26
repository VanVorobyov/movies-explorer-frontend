import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { filterMovies } from '../../utils/constants';

const SavedMovies = (props) => {
  const { isLoggedIn, isLoading, movies, savedMovies, onMovieDelete, onBurgerButtonClick } = props;

  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShortSavedMovies, setIsShortSavedMovies] = useState(false);
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
    } else {
      setIsQueryError(false);
      const searchedSavedMovies = savedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase().trim()));
      setSearchedSavedMovies(searchedSavedMovies);
    }
  };

  useEffect(() => {
    const filteredMovies = savedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase().trim()));
    if (isShortSavedMovies) {
      const filteredShortMovies = filterMovies(filteredMovies);
      setShortSavedMovies(filteredShortMovies);
    } else {
      setSearchedSavedMovies(filteredMovies);
    }
  }, [savedMovies, searchQuery, isShortSavedMovies]);

  const handleSearchMovies = (value) => {
    setSearchQuery(value);
  };

  return (
    <>
      <Header
        onClick={onBurgerButtonClick}
        isLoggedIn={isLoggedIn}
      />
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
          isLoading={isLoading}
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
