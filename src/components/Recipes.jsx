import { useContext } from 'react';
import { Link } from 'react-router-dom';
import MainContext from '../context/MainContext';
import CategoryButtons from './CategoryButtons';
import '../style/Recipes.css';

function Recipes() {
  const { dataValue, filterFetch } = useContext(MainContext);
  const NUMBER12 = 12;
  return (
    <div>
      <CategoryButtons />
      <div className="recipes-container">
        {(dataValue.meals && !filterFetch.dataValue.meals) && (
          dataValue.meals.slice(0, NUMBER12).map((meal, index) => {
            const { strMeal, strMealThumb, idMeal } = meal;
            return (
              <div
                className="recipes-individual-container"
                key={ `${strMeal}${index}` }
                data-testid={ `${index}-recipe-card` }
              >
                <Link className="recipes-link" to={ `/meals/${idMeal}` }>
                  <img
                    className="recipes-image"
                    data-testid={ `${index}-card-img` }
                    src={ strMealThumb }
                    alt="meal"
                  />
                  <h2 data-testid={ `${index}-card-name` }>{strMeal}</h2>
                </Link>
              </div>
            );
          })
        ) }
        {(dataValue.meals && !!filterFetch.dataValue.meals) && (
          filterFetch.dataValue.meals.slice(0, NUMBER12).map((meal, index) => {
            const { strMeal, strMealThumb, idMeal } = meal;
            return (
              <div
                className="recipes-individual-container"
                key={ `${strMeal}${index}` }
                data-testid={ `${index}-recipe-card` }
              >
                <Link className="recipes-link" to={ `/meals/${idMeal}` }>
                  <img
                    className="recipes-image"
                    data-testid={ `${index}-card-img` }
                    src={ strMealThumb }
                    alt="meal"
                  />
                  <h2 data-testid={ `${index}-card-name` }>{strMeal}</h2>
                </Link>
              </div>
            );
          })
        ) }
        {(dataValue.drinks && !filterFetch.dataValue.drinks) && (
          dataValue.drinks.slice(0, NUMBER12).map((meal, index) => {
            const { strDrink, strDrinkThumb, idDrink } = meal;
            return (
              <div
                className="recipes-individual-container"
                key={ `${strDrink}${index}` }
                data-testid={ `${index}-recipe-card` }
              >
                <Link className="recipes-link" to={ `/drinks/${idDrink}` }>
                  <img
                    className="recipes-image"
                    data-testid={ `${index}-card-img` }
                    src={ strDrinkThumb }
                    alt="meal"
                  />
                  <h2 data-testid={ `${index}-card-name` }>{strDrink}</h2>
                </Link>
              </div>
            );
          })
        ) }
        {(dataValue.drinks && !!filterFetch.dataValue.drinks) && (
          filterFetch.dataValue.drinks.slice(0, NUMBER12).map((meal, index) => {
            const { strDrink, strDrinkThumb, idDrink } = meal;
            return (
              <div
                className="recipes-individual-container"
                key={ `${strDrink}${index}` }
                data-testid={ `${index}-recipe-card` }
              >
                <Link className="recipes-link" to={ `/drinks/${idDrink}` }>
                  <img
                    className="recipes-image"
                    data-testid={ `${index}-card-img` }
                    src={ strDrinkThumb }
                    alt="meal"
                  />
                  <h2 data-testid={ `${index}-card-name` }>{strDrink}</h2>
                </Link>
              </div>
            );
          })
        ) }
      </div>
    </div>
  );
}

export default Recipes;
