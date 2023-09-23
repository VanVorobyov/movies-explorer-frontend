import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({
  handleCheckboxClick,
  handleSavedCheckboxClick,
  handleShortMovies,
  handleSubmit,
  isShortMovies,
  isShortSavedMovies,
  isQueryError,
  onQueryError,
  searchMovies,
  onSearchMovies,
  savedMovies,
}) => {
  const handleChange = (event) => {
    const { value } = event.target;
    onSearchMovies(value);
    onQueryError(false);
  };

  return (
    <section className="search">
      <div className="search__content">
        <form
          className="search-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            id="search-input"
            type="text"
            className="search__input"
            placeholder="Фильм"
            autoComplete="off"
            required={true}
            minLength="2"
            value={searchMovies.trim()}
            onChange={handleChange}
          />
          <span className="search__input-error">{isQueryError && 'Нужно ввести ключевое слово'}</span>
          <button
            className="search__button"
            type="submit"
          >
            Поиск
          </button>
        </form>
        <FilterCheckbox
          handleCheckboxClick={handleCheckboxClick}
          handleSavedCheckboxClick={handleSavedCheckboxClick}
          handleShortMovies={handleShortMovies}
          isShortMovies={isShortMovies}
          isShortSavedMovies={isShortSavedMovies}
          savedMovies={savedMovies}
        />
      </div>
    </section>
  );
};

export default SearchForm;
