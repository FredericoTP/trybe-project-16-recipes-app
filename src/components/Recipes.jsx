import { useContext } from 'react';
import { Link } from 'react-router-dom';
import MainContext from '../context/MainContext';
import CategoryButtons from './CategoryButtons';

function Recipes() {
  const { dataValue } = useContext(MainContext);
  const NUMBER12 = 12;
  return (
    <div>
      <CategoryButtons />
      {dataValue.meals && (
        dataValue.meals.slice(0, NUMBER12).map((meal, index) => {
          const { strMeal, strMealThumb, idMeal } = meal;
          return (
            <div key={ strMeal } data-testid={ `${index}-recipe-card` }>
              <Link to={ `/meals/${idMeal}` }>
                <h2 data-testid={ `${index}-card-name` }>{strMeal}</h2>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strMealThumb }
                  alt="meal"
                />
              </Link>
            </div>
          );
        })
      ) }
      {dataValue.drinks && (
        dataValue.drinks.slice(0, NUMBER12).map((meal, index) => {
          const { strDrink, strDrinkThumb, idDrink } = meal;
          return (
            <div key={ strDrink } data-testid={ `${index}-recipe-card` }>
              <Link to={ `/drinks/${idDrink}` }>
                <h2 data-testid={ `${index}-card-name` }>{strDrink}</h2>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ strDrinkThumb }
                  alt="meal"
                />
              </Link>
            </div>
          );
        })
      ) }
    </div>
  );
}

export default Recipes;
