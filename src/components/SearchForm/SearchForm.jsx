import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  return (
    <section className="search">
      <div className="search__content">
        <form className="search-form">
          <input
            id="search-input"
            type="search"
            className="search__input"
            placeholder="Фильм"
            autoComplete="off"
          />
          <button
            className="search__button"
            type="submit"
          >
            Поиск
          </button>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  );
};

export default SearchForm;
