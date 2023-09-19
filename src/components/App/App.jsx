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

import moviesApi from '../../utils/MoviesApi';
import auth from '../../utils/Auth';
import mainApi from '../../utils/MainApi';

import { CurrentUserContext } from '../../context/CurrentUserContext';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isApiError, setIsApiError] = useState('');

  const navigate = useNavigate();
  const path = useLocation().pathname;

  const handleBurgerMenuOpen = () => setBurgerMenuOpen(true);

  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('searchMovies');
    localStorage.removeItem('searchedMovies');
    localStorage.removeItem('filteredMovies');
    localStorage.removeItem('searchSavedMovies');
    localStorage.removeItem('searchedSavedMovies');
    localStorage.removeItem('filteredSavedMovies');
    setIsLoggedIn(false);
    setUserEmail('');
    navigate('/');
  };

  const handleError = (err) => {
    if (err === 'Ошибка: 409 Conflict') return setIsApiError('Пользователь с таким email уже существует');
    if (err === 'Ошибка: 401 Unauthorized') return setIsApiError('Пользователь с таким email не найден, необходимо зарегистрироваться');
    if (err) return setIsApiError(`Что то пошло не так... Попробуйте позже`);
  };

  const closeAll = () => {
    setBurgerMenuOpen(false);
  };

  const handleRegisterUser = (name, email, password) => {
    auth
      .register(name, email, password)
      .then(() => auth.login(email, password))
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setUserEmail(email);
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        handleError(err);
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleLoginUser = (email, password) => {
    auth
      .login(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setUserEmail(email);
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        handleError(err);
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .catch((err) => {
        handleError(err);
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleUpdateUser = (inputValues) => {
    const makeRequest = () => {
      return mainApi.setUserInfo(inputValues).then(setCurrentUser);
    };
    handleSubmit(makeRequest);
  };

  const handleSaveMovie = (movie) => {
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      });
  };

  const handleDeleteMovie = (movie) => {
    const makeRequest = () => {
      return mainApi.deleteMovie(movie._id).then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== movie._id));
      });
    };
    handleSubmit(makeRequest);
  };

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

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies(), moviesApi.getInitialCards()])
        .then(([userInfo, movies, getInitialCards]) => {
          setCurrentUser(userInfo);
          setSavedMovies(movies.reverse());
          setMovies(getInitialCards);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
                savedMovies={savedMovies}
                isLoading={isLoading}
                onSaveMovie={handleSaveMovie}
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
                isLoading={isLoading}
                movies={movies}
                savedMovies={savedMovies}
                onMovieDelete={handleDeleteMovie}
                onBurgerButtonClick={handleBurgerMenuOpen}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                email={userEmail}
                isLoggedIn={isLoggedIn}
                onBurgerButtonClick={handleBurgerMenuOpen}
                onUpdateUser={handleUpdateUser}
                onLogOut={handleLogOut}
                isApiError={isApiError}
                setIsApiError={setIsApiError}
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
                isApiError={isApiError}
                setIsApiError={setIsApiError}
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
                isApiError={isApiError}
                setIsApiError={setIsApiError}
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
    </CurrentUserContext.Provider>
  );
};

export default App;
