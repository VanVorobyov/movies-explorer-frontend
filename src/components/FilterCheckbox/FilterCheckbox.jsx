import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ handleCheckboxClick, handleShortMovies, isShortMovies }) => {
  return (
    <div className="filter">
      <input
        id="filter"
        type="checkbox"
        className="filter__checkbox"
        defaultChecked={isShortMovies}
        onClick={() => {
          handleCheckboxClick();
          handleShortMovies();
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
