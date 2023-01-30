import { useContext, useState } from 'react';
import MainContext from '../context/MainContext';

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

  return (
    <div>
      <button
        data-testid="All-category-filter"
        onClick={ () => filterFetch.setDataValue([]) }
      >
        All
      </button>
      {dataValue.meals && (
        dataValue.meals.slice(0, NUMBER5).map((meal, index) => {
          const { strCategory } = meal;
          return (
            <div key={ `${strCategory}${index}` }>
              <button
                data-testid={ `${strCategory}-category-filter` }
                onClick={
                  () => toggleFilterMeal(strCategory, URLMEAL)
                }
              >
                {strCategory}
              </button>
            </div>
          );
        })
      ) }
      {dataValue.drinks && (
        dataValue.drinks.slice(0, NUMBER5).map((drinks, index) => {
          const { strCategory } = drinks;
          return (
            <div key={ `${strCategory}${index}` }>
              <button
                data-testid={ `${strCategory}-category-filter` }
                onClick={
                  () => toggleFilterMeal(strCategory, URLDRINK)
                }
              >
                {strCategory}
              </button>
            </div>
          );
        })
      ) }
    </div>
  );
}

export default CategoryButtons;
