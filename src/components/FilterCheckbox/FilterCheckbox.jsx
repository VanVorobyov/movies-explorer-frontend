import React from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = () => {
  return (
    <form className="filter">
      <input id="filter" type="checkbox" className="filter__checkbox" />
      <label className="filter__label" htmlFor="filter">
        Короткометражки
      </label>
    </form>
  );
};

export default FilterCheckbox;
