import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({ handleCheckboxClick, handleShortMovies, isShortMovies }) => {
  return (
    <section className="search">
      <div className="search__content">
        <form className="search-form">
          <input
            id="search-input"
            type="text"
            className="search__input"
            placeholder="Фильм"
            autoComplete="off"
            required={true}
            minLength="2"
          />
          <button
            className="search__button"
            type="submit"
          >
            Поиск
          </button>
        </form>
        <FilterCheckbox
          handleCheckboxClick={handleCheckboxClick}
          handleShortMovies={handleShortMovies}
          isShortMovies={isShortMovies}
        />
      </div>
    </section>
  );
};

export default SearchForm;
