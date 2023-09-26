import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ handleCheckboxClick, handleSavedCheckboxClick, handleShortMovies, isShortMovies, isShortSavedMovies, savedMovies }) => {
  return (
    <div className="filter">
      <input
        id="filter"
        type="checkbox"
        className="filter__checkbox"
        defaultChecked={savedMovies ? isShortSavedMovies : isShortMovies}
        onClick={() => {
          savedMovies ? handleSavedCheckboxClick() : handleCheckboxClick();
          !savedMovies && handleShortMovies();
        }}
      />
      <label
        className="filter__label"
        htmlFor="filter"
      >
        Короткометражки
      </label>
    </div>
  );
};

export default FilterCheckbox;
