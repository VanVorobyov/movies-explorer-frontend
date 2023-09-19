import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import FilterMovies from '../../utils/FilterMovies';
import useLocalStorage from '../../hooks/useLocalStorage';

const SavedMovies = (props) => {
  const { movies, savedMovies, onMovieDelete, onBurgerButtonClick } = props;
  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]);
  const [searchSavedMovies, setSearchSavedMovies] = useState('');
  const [isShortSavedMovies, setIsShortSavedMovies] = useLocalStorage('isShortSavedMovies', false);
  const [shortSavedMovies, setShortSavedMovies] = useState([]);
  const [isQueryError, setIsQueryError] = useState(false);

  const handleSearchMovies = (value) => {
    setSearchSavedMovies(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchSavedMovies.trim() === '') {
      console.log('пустой запрос');
      setIsQueryError(true);
      setSearchedSavedMovies(savedMovies);
      localStorage.removeItem('searchedSavedMovies');
      localStorage.removeItem('searchSavedMovies');
    } else {
      setIsQueryError(false);
      const searchedSavedMovies = savedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchSavedMovies.toLowerCase().trim()));
      localStorage.setItem('searchedSavedMovies', JSON.stringify(searchedSavedMovies));
      localStorage.setItem('searchSavedMovies', JSON.stringify(searchSavedMovies.trim()));
      setSearchedSavedMovies(searchedSavedMovies);

      if (isShortSavedMovies) {
        localStorage.setItem('filteredSavedMovies', JSON.stringify(FilterMovies(searchedSavedMovies)));
        setShortSavedMovies(JSON.parse(localStorage.getItem('filteredSavedMovies')));
      }

      console.log(searchedSavedMovies);
    }
  };

  const handleSavedCheckboxClick = () => {
    setIsShortSavedMovies((prev) => !prev);
  };

  const handleSavedShortMovies = () => {
    localStorage.setItem('filteredSavedMovies', JSON.stringify(FilterMovies(searchedSavedMovies)));
  };

  useEffect(() => {
    if (isShortSavedMovies) {
      setShortSavedMovies(JSON.parse(localStorage.getItem('filteredSavedMovies')));
    } else if (searchSavedMovies.trim() !== '') {
      setShortSavedMovies(savedMovies);
    } else {
      setSearchedSavedMovies(savedMovies);
    }
  }, [isShortSavedMovies, savedMovies]);

  useEffect(() => {
    const storedSearchedSavedMovies = JSON.parse(localStorage.getItem('searchedSavedMovies'));
    const storedSearchSavedMovies = JSON.parse(localStorage.getItem('searchSavedMovies'));

    if (storedSearchedSavedMovies) {
      setSearchedSavedMovies(storedSearchedSavedMovies);
    }
    if (storedSearchSavedMovies) {
      setSearchSavedMovies(storedSearchSavedMovies);
    }
  }, []);

  return (
    <>
      <Header onClick={onBurgerButtonClick} />
      <main>
        <SearchForm
          handleSavedCheckboxClick={handleSavedCheckboxClick}
          handleSavedShortMovies={handleSavedShortMovies}
          handleSubmit={handleSubmit}
          isShortSavedMovies={isShortSavedMovies}
          searchMovies={searchSavedMovies}
          onSearchMovies={handleSearchMovies}
          isQueryError={isQueryError}
          onQueryError={setIsQueryError}
          savedMovies={savedMovies}
        />
        <MoviesCardList
          movies={movies}
          savedMovies={isShortSavedMovies ? shortSavedMovies : searchedSavedMovies}
          onMovieDelete={onMovieDelete}
        />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
