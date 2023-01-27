import { useContext } from 'react';
import MainContext from '../context/MainContext';

function CategoryButtons() {
  const { categoryFetch } = useContext(MainContext);
  const { dataValue } = categoryFetch;
  const NUMBER5 = 5;

  return (
    <div>
      <button data-testid="All-category-filter">
        All
      </button>
      {dataValue.meals && (
        dataValue.meals.slice(0, NUMBER5).map((meal) => {
          const { strCategory } = meal;
          return (
            <div key={ strCategory }>
              <button
                data-testid={ `${strCategory}-category-filter` }
              >
                {strCategory}
              </button>
            </div>
          );
        })
      ) }
      {dataValue.drinks && (
        dataValue.drinks.slice(0, NUMBER5).map((drinks) => {
          const { strCategory } = drinks;
          return (
            <div key={ strCategory }>
              <button
                data-testid={ `${strCategory}-category-filter` }
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
