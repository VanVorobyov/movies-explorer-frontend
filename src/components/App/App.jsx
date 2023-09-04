import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFounfPage';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import ScrollToTop from '../../utils/ScrollToTop/ScrollToTop';

import api from '../../utils/MoviesApi';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [movies, setMovies] = useState([]);

  const handleBurgerMenuOpen = () => setBurgerMenuOpen(true);

  const closeAll = () => {
    setBurgerMenuOpen(false);
  };

  useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setMovies(initialCards.reverse());
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              isLoggedIn={!isLoggedIn}
              onBurgerButtonClick={handleBurgerMenuOpen}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <Movies
              isLoggedIn={isLoggedIn}
              movies={movies}
              onBurgerButtonClick={handleBurgerMenuOpen}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <SavedMovies
              isLoggedIn={isLoggedIn}
              movies={movies}
              onBurgerButtonClick={handleBurgerMenuOpen}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              isLoggedIn={isLoggedIn}
              onBurgerButtonClick={handleBurgerMenuOpen}
            />
          }
        />
        <Route
          path="/signin"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Register />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>

      <BurgerMenu
        isOpen={isBurgerMenuOpen}
        onClose={closeAll}
      />
    </div>
  );
};

export default App;
