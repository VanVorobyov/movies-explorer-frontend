import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
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

import auth from '../../utils/Auth';
import mainApi from '../../utils/MainApi';

import { CurrentUserContext } from '../../context/CurrentUserContext';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [moviesLoaded, setMoviesLoaded] = useState(false);
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
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser({
      name: '',
      email: '',
    });
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
    setIsLoading(true);
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
    setIsLoading(true);
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
    request()
      .then(() => {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      })
      .catch((err) => {
        handleError(err);
        console.error(err);
      });
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
        console.log(err);
      });
  };

  const handleDeleteMovie = (movie) => {
    if (!movie || !movie.movieId) {
      console.error('Invalid movie object or movie ID');
      return;
    }

    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((prevSavedMovies) => prevSavedMovies.filter((item) => item._id !== movie._id));
      })
      .catch((error) => {
        console.error('Error deleting movie:', error);
      });
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
      setIsLoading(true);
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
        .then(([userInfo, savedMovies]) => {
          setCurrentUser(userInfo);
          setSavedMovies(savedMovies.reverse());
          setMoviesLoaded(true);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoggedIn, moviesLoaded]);

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
                setIsLoading={setIsLoading}
                movies={movies}
                savedMovies={savedMovies}
                isLoading={isLoading}
                onSaveMovie={handleSaveMovie}
                onMovieDelete={handleDeleteMovie}
                onBurgerButtonClick={handleBurgerMenuOpen}
                setMovies={setMovies}
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
                isSuccess={isSuccess}
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
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Login
                  isSuccess={isSuccess}
                  onLogin={handleLoginUser}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  isApiError={isApiError}
                  setIsApiError={setIsApiError}
                />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Register
                  isSuccess={isSuccess}
                  onRegister={handleRegisterUser}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  isApiError={isApiError}
                  setIsApiError={setIsApiError}
                />
              )
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
