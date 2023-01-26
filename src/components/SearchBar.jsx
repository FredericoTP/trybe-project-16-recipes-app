import { useContext } from 'react';
import MainContext from '../context/MainContext';

function SearchBar() {
  const {
    searchInput, radioInput, handleClickSearch,
  } = useContext(MainContext);

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        placeholder="pesquisar"
        value={ searchInput.value }
        onChange={ searchInput.handleChange }
      />
      <label htmlFor="ingredient">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          name="search-radio"
          id="ingredient"
          value="ingredient"
          type="radio"
          onChange={ radioInput.handleChange }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          data-testid="name-search-radio"
          name="search-radio"
          id="name"
          value="name"
          type="radio"
          onChange={ radioInput.handleChange }
        />
      </label>
      <label htmlFor="first-letter">
        First Letter
        <input
          data-testid="first-letter-search-radio"
          name="search-radio"
          id="first-letter"
          value="first-letter"
          type="radio"
          onChange={ radioInput.handleChange }
        />
      </label>
      <button
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
