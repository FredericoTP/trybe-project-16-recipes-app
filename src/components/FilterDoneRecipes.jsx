import { useContext } from 'react';
import MainContext from '../context/MainContext';
import foodDrink from '../images/food-drink.png';
import imgMeal from '../images/mealIcon.svg';
import imgDrink from '../images/drinkIcon.svg';
import '../style/FilterDoneRecipes.css';

function FilterDoneRecipes() {
  const { setDoneFilter } = useContext(MainContext);
  return (
    <div className="filterdone-container">
      <button
        className="filterdone-btn"
        data-testid="filter-by-all-btn"
        onClick={ () => setDoneFilter('') }
      >
        <img src={ foodDrink } alt="all" />
        All
      </button>
      <button
        className="filterdone-btn"
        data-testid="filter-by-meal-btn"
        onClick={ () => setDoneFilter('meal') }
      >
        <img src={ imgMeal } alt="meal" />
        Meals
      </button>
      <button
        className="filterdone-btn"
        data-testid="filter-by-drink-btn"
        onClick={ () => setDoneFilter('drink') }
      >
        <img src={ imgDrink } alt="drink" />
        Drinks
      </button>
    </div>
  );
}

export default FilterDoneRecipes;
