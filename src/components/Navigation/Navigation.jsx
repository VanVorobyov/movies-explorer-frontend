import React from 'react';
import { useLocation } from 'react-router-dom';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import NavigationMovies from '../NavigationMovies/NavigationMovies';

const Navigation = ({ isLoggedIn }) => {
  return <div>{isLoggedIn ? <NavigationAuth /> : <NavigationMovies />}</div>;
};

export default Navigation;
