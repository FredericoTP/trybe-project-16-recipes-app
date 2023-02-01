/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext } from 'react';
import MainContext from '../context/MainContext';
import '../style/SearchBar.css';

function SearchBar() {
  const {
    searchInput, radioInput, handleClickSearch,
  } = useContext(MainContext);

  return (
    <div className="searchbar-container">
      <input
        className="form-control searchbar-input-search"
        data-testid="search-input"
        type="text"
        placeholder="Search"
        value={ searchInput.value }
        onChange={ searchInput.handleChange }
      />
      <div className="searchbar-radio-container">
        <label className="form-check-label font-size-label" htmlFor="ingredient">
          <input
            className="form-check-input search-radio"
            data-testid="ingredient-search-radio"
            name="search-radio"
            id="ingredient"
            value="ingredient"
            type="radio"
            onChange={ radioInput.handleChange }
          />
          Ingredient
        </label>
        <label className="form-check-label font-size-label" htmlFor="name">
          <input
            className="form-check-input search-radio"
            data-testid="name-search-radio"
            name="search-radio"
            id="name"
            value="name"
            type="radio"
            onChange={ radioInput.handleChange }
          />
          Name
        </label>
        <label className="form-check-label font-size-label" htmlFor="first-letter">
          <input
            className="form-check-input search-radio"
            data-testid="first-letter-search-radio"
            name="search-radio"
            id="first-letter"
            value="first-letter"
            type="radio"
            onChange={ radioInput.handleChange }
          />
          First Letter
        </label>
      </div>
      <button
        className="searchbar-btn"
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleClickSearch }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
