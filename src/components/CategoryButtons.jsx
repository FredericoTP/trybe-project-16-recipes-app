import { useContext, useState } from 'react';
import MainContext from '../context/MainContext';
import beef from '../images/beef.svg';
import breakfast from '../images/breakfast.png';
import chicken from '../images/chicken.png';
import dessert from '../images/dessert.png';
import goat from '../images/goat.png';
import ordinary from '../images/ordinary.png';
import cocktail from '../images/cocktail.png';
import shake from '../images/shake.png';
import other from '../images/other.png';
import cocoa from '../images/cocoa.png';
import imgMeal from '../images/mealIcon.svg';
import imgDrink from '../images/drinkIcon.svg';
import '../style/CategoryButtons.css';

function CategoryButtons() {
  const { categoryFetch, filterFetch } = useContext(MainContext);
  const [cat, setCat] = useState('');
  const { dataValue } = categoryFetch;
  const NUMBER5 = 5;
  const URLMEAL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const URLDRINK = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

  function toggleFilterMeal(category, url) {
    if (cat === category) {
      filterFetch.setDataValue([]);
      setCat('');
    } else {
      filterFetch.fetchApiFiltered(`${url}${category}`);
      setCat(category);
    }
  }

  const mealsIcons = [beef, breakfast, chicken, dessert, goat];
  const drinksIcons = [ordinary, cocktail, shake, other, cocoa];

  return (
    <div className="categorybtn-container">
      {
        dataValue.meals ? (
          <button
            data-testid="All-category-filter"
            onClick={ () => filterFetch.setDataValue([]) }
          >
            <img src={ imgMeal } alt="meal" />
            All
          </button>
        ) : (
          <button
            data-testid="All-category-filter"
            onClick={ () => filterFetch.setDataValue([]) }
          >
            <img src={ imgDrink } alt="drink" />
            All
          </button>)
      }
      {dataValue.meals && (
        dataValue.meals.slice(0, NUMBER5).map((meal, index) => {
          const { strCategory } = meal;
          return (
            <button
              key={ `${strCategory}${index}` }
              data-testid={ `${strCategory}-category-filter` }
              onClick={
                () => toggleFilterMeal(strCategory, URLMEAL)
              }
            >
              <img src={ mealsIcons[index] } alt={ strCategory } />
              {strCategory}
            </button>
          );
        })
      ) }
      {dataValue.drinks && (
        dataValue.drinks.slice(0, NUMBER5).map((drinks, index) => {
          const { strCategory } = drinks;
          return (
            <button
              key={ `${strCategory}${index}` }
              data-testid={ `${strCategory}-category-filter` }
              onClick={
                () => toggleFilterMeal(strCategory, URLDRINK)
              }
            >
              <img src={ drinksIcons[index] } alt={ strCategory } />
              {strCategory}
            </button>
          );
        })
      ) }
    </div>
  );
}

export default CategoryButtons;
