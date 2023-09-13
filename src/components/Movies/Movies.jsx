import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import FilterMovies from '../../utils/FilterMovies';
import useLocalStorage from '../../hooks/useLocalStorage';

const Movies = (props) => {
  const { movies, savedMovies, onSaveMovie, onBurgerButtonClick } = props;

  const [isShortMovies, setIsShortMovies] = useLocalStorage('isShortMovies', false);
  const [shortMovies, setShortMovies] = useState([]);

  const handleCheckboxClick = () => {
    setIsShortMovies((prev) => !prev);
  };

  const handleShortMovies = () => {
    localStorage.setItem('filteredMovies', JSON.stringify(FilterMovies(movies)));
  };

  useEffect(() => {
    if (isShortMovies) {
      setShortMovies(JSON.parse(localStorage.getItem('filteredMovies')));
    } else {
      setShortMovies(movies);
    }
  }, [isShortMovies, movies]);

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
          movies={shortMovies}
          savedMovies={savedMovies}
          onSaveMovie={onSaveMovie}
        />
      </main>
      <Footer />
    </>
  );
};

export default Movies;
