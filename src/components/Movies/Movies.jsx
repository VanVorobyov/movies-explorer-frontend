import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import FilterMovies from '../../utils/FilterMovies';
import useLocalStorage from '../../hooks/useLocalStorage';

const Movies = (props) => {
  const { movies, savedMovies, onSaveMovie, onBurgerButtonClick } = props;
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useLocalStorage('isShortMovies', false);
  const [searchMovies, setSearchMovies] = useState('');
  const [isQueryError, setIsQueryError] = useState(false);

  const handleSearchMovies = (value) => {
    setSearchMovies(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchMovies.trim() === '') {
      console.log('пустой запрос');
      setIsQueryError(true);
      setSearchedMovies([]);
      localStorage.removeItem('searchedMovies');
      localStorage.removeItem('searchMovies');
    } else {
      setIsQueryError(false);
      const searchedMovies = movies.filter((movie) => movie.nameRU.toLowerCase().includes(searchMovies.toLowerCase().trim()));

      localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
      localStorage.setItem('searchMovies', JSON.stringify(searchMovies.trim()));

      setSearchedMovies(searchedMovies);

      if (isShortMovies) {
        localStorage.setItem('filteredMovies', JSON.stringify(FilterMovies(searchedMovies)));
        setShortMovies(JSON.parse(localStorage.getItem('filteredMovies')));
      }
      console.log(searchedMovies);
    }
  };

  const handleCheckboxClick = () => {
    setIsShortMovies((prev) => !prev);
  };

  const handleShortMovies = () => {
    localStorage.setItem('filteredMovies', JSON.stringify(FilterMovies(searchedMovies)));
  };

  useEffect(() => {
    if (isShortMovies) {
      setShortMovies(JSON.parse(localStorage.getItem('filteredMovies')));
    } else {
      setShortMovies(searchedMovies);
    }
  }, [isShortMovies]);

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
      <Header onClick={onBurgerButtonClick} />
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
        />
        <MoviesCardList
          movies={isShortMovies ? shortMovies : searchedMovies}
          savedMovies={savedMovies}
          onSaveMovie={onSaveMovie}
        />
      </main>
      <Footer />
    </>
  );
};

export default Movies;
