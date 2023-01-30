import { useContext } from 'react';
import MainContext from '../context/MainContext';

function FilterDoneRecipes() {
  const { setDoneFilter } = useContext(MainContext);
  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setDoneFilter('') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => setDoneFilter('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => setDoneFilter('drink') }
      >
        Drinks
      </button>
    </div>
  );
}

export default FilterDoneRecipes;
