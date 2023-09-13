import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import FilterMovies from '../../utils/FilterMovies';
import useLocalStorage from '../../hooks/useLocalStorage';

const SavedMovies = (props) => {
  const { movies, savedMovies, onMovieDelete, onBurgerButtonClick } = props;

  const [isShortMovies, setIsShortMovies] = useLocalStorage('isShortMovies', false);
  const [shortSavedMovies, setShortSavedMovies] = useState([]);

  const handleCheckboxClick = () => {
    setIsShortMovies((prev) => !prev);
  };

  const handleShortMovies = () => {
    localStorage.setItem('filteredSavedMovies', JSON.stringify(FilterMovies(savedMovies)));
  };

  useEffect(() => {
    if (isShortMovies) {
      setShortSavedMovies(JSON.parse(localStorage.getItem('filteredSavedMovies')));
    } else {
      setShortSavedMovies(savedMovies);
    }
  }, [isShortMovies, savedMovies]);

  return (
    <>
      <Header onClick={onBurgerButtonClick} />
      <main>
        <SearchForm
          handleCheckboxClick={handleCheckboxClick}
          handleShortMovies={handleShortMovies}
          isShortMovies={isShortMovies}
        />
        <MoviesCardList
          movies={movies}
          savedMovies={shortSavedMovies}
          onMovieDelete={onMovieDelete}
        />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
