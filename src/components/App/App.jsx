import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
import auth from '../../utils/Auth';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const path = useLocation().pathname;

  const handleBurgerMenuOpen = () => setBurgerMenuOpen(true);

  const closeAll = () => {
    setBurgerMenuOpen(false);
  };

  const handleRegisterUser = (name, email, password) => {
    auth
      .register(name, email, password)
      .then((data) => {
        // setIsSuccess(true);
        // setUserEmail(data.email);
        navigate('/signin');
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleLoginUser = (email, password) => {
    auth
      .login(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        // setUserEmail(email);
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  // const checkToken = () => {
  //   const jwt = localStorage.getItem('jwt');
  //   if (jwt) {
  //     auth
  //       .checkToken(jwt)
  //       .then(() => {
  //         // setUserEmail(res.email);
  //         setIsLoggedIn(true);
  //         // navigate('/', { replace: true });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setIsLoggedIn(false);
  //       });
  //   }
  // };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then(() => {
          // setUserEmail(res.email);
          setIsLoggedIn(true);
          navigate(path, { replace: true });
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
        });
    }
  }, [isLoggedIn]);

  console.log(isLoggedIn);

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
              isLoggedIn={isLoggedIn}
              onBurgerButtonClick={handleBurgerMenuOpen}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute
              element={Movies}
              isLoggedIn={isLoggedIn}
              movies={movies}
              isLoading={isLoading}
              onBurgerButtonClick={handleBurgerMenuOpen}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute
              element={SavedMovies}
              isLoggedIn={isLoggedIn}
              movies={movies}
              isLoading={isLoading}
              onBurgerButtonClick={handleBurgerMenuOpen}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              element={Profile}
              isLoggedIn={isLoggedIn}
              onBurgerButtonClick={handleBurgerMenuOpen}
              email={userEmail}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <Login
              isSuccess={isSuccess}
              onLogin={handleLoginUser}
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Register
              isSuccess={isSuccess}
              onRegister={handleRegisterUser}
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
            />
          }
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
