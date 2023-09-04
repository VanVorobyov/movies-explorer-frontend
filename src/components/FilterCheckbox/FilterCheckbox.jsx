import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <div className="filter">
      <input
        id="filter"
        type="checkbox"
        className="filter__checkbox"
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
