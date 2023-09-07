import React from 'react';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import NavigationMovies from '../NavigationMovies/NavigationMovies';

const Navigation = ({ isLoggedIn, isPromo }) => {
  return <div className="nav">{isPromo && !isLoggedIn ? <NavigationAuth /> : <NavigationMovies />}</div>;
};

export default Navigation;
