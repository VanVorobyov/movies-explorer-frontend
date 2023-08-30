import { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFounfPage';
import ScrollToTop from '../../utils/ScrollToTop/ScrollToTop';

import api from '../../utils/MoviesApi';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [movies, setMovies] = useState([]);

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
          element={<Main isLoggedIn={!isLoggedIn} />}
        />
        <Route
          path="/movies"
          element={
            <Movies
              isLoggedIn={isLoggedIn}
              movies={movies}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <SavedMovies
              isLoggedIn={isLoggedIn}
              movies={movies}
            />
          }
        />
        <Route
          path="/profile"
          element={<Profile isLoggedIn={isLoggedIn} />}
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
    </div>
  );
};

export default App;
