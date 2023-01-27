import React, { useContext } from 'react';
import MainContext from '../context/MainContext';

function RecipeDetails() {
  const { detailsFetch } = useContext(MainContext);

  function getItens() {
    let entries = [];
    if (detailsFetch.dataValue.meals) {
      entries = Object.entries(detailsFetch.dataValue.meals[0]);
    }
    if (detailsFetch.dataValue.drinks) {
      entries = Object.entries(detailsFetch.dataValue.drinks[0]);
    }
    const ingredients = entries
      .filter((item) => item[0].includes('strIngredient'));
    const measures = entries
      .filter((item) => item[0].includes('strMeasure'));
    const combine = ingredients
      .map((item, index) => `${item[1]} ${measures[index][1]}`)
      .map((item) => item.replace('null', ''))
      .filter((item) => !item.includes('null'));

    return combine;
  }

  return (
    <div>
      {
        detailsFetch.dataValue.meals && detailsFetch.dataValue.meals.map((item) => (
          <div key={ item.strMeal }>
            <img
              data-testid="recipe-photo"
              src={ item.strMealThumb }
              alt={ item.strMeal }
            />
            <h2 data-testid="recipe-title">{ item.strMeal }</h2>
            <h4 data-testid="recipe-category">{ item.strCategory }</h4>
            {
              getItens().map((element, index) => (
                <p
                  key={ element }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {
                    ` ${element}`
                  }
                </p>
              ))
            }
            <p data-testid="instructions">{item.strInstructions}</p>
            <iframe
              data-testid="video"
              title={ item.strMeal }
              width="420"
              height="315"
              src={ item.strYoutube }
            />
          </div>
        ))
      }

      {
        detailsFetch.dataValue.drinks && detailsFetch.dataValue.drinks.map((item) => (
          <div key={ item.strDrink }>
            <img
              data-testid="recipe-photo"
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
            />
            <h2 data-testid="recipe-title">{ item.strDrink }</h2>
            <h4 data-testid="recipe-category">{ item.strAlcoholic }</h4>
            {
              getItens().map((element, index) => (
                <p key={ element } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {
                    ` ${element}`
                  }
                </p>
              ))
            }
            <p data-testid="instructions">{item.strInstructions}</p>
            <iframe
              data-testid="video"
              title={ item.strDrink }
              width="420"
              height="315"
              src={ item.strYoutube }
            />
          </div>
        ))
      }
    </div>
  );
}

export default RecipeDetails;
