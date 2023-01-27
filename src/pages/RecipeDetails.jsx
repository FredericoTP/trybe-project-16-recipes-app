import React, { useContext } from 'react';
import MainContext from '../context/MainContext';

function RecipeDetails() {
  const { dataValue } = useContext(MainContext);
  return (
    <div>
      {
        dataValue.meals && dataValue.meals.map((element) => (
          <div key={ element.IdMeal }>
            <img
              data-testid="recipe-photo"
              src={ element.strMealThumb }
              alt={ element.strMeal }
            />
            <h2 data-testid="recipe-title">{ element.strMeal }</h2>
            <h4 data-testid="recipe-category">{ element.strCategory }</h4>
            <p data-testid="0-ingredient-name-and-measure">
              {
                ` ${element.strIngredient1} - ${element.strMeasure1} `
              }
            </p>
            <p data-testid="1-ingredient-name-and-measure">
              { element.strIngredient2 }
              -
              {element.strMeasure2}
            </p>
            <p data-testid="2-ingredient-name-and-measure">
              { element.strIngredient3 }
              {element.strMeasure3}
            </p>
            <p data-testid="3-ingredient-name-and-measure">
              { element.strIngredient4 }
              {element.strMeasure4}
            </p>
            <p data-testid="4-ingredient-name-and-measure">
              { element.strIngredient5 }
              {element.strMeasure5}
            </p>
            <p data-testid="5-ingredient-name-and-measure">
              { element.strIngredient6 }
              {element.strMeasure6}
            </p>
            <p data-testid="6-ingredient-name-and-measure">
              { element.strIngredient7 }
              {element.strMeasure7}
            </p>
            <p data-testid="7-ingredient-name-and-measure">
              { element.strIngredient8 }
              {element.strMeasure8}
            </p>
            <p data-testid="8-ingredient-name-and-measure">
              { element.strIngredient9 }
              {element.strMeasure9}
            </p>
            <p data-testid="9-ingredient-name-and-measure">
              { element.strIngredient10 }
              {element.strMeasure10}
            </p>
            <p data-testid="10-ingredient-name-and-measure">
              { element.strIngredient11 }
              {element.strMeasure11}
            </p>
            <p data-testid="11-ingredient-name-and-measure">
              { element.strIngredient12 }
              {element.strMeasure12}
            </p>
            <p data-testid="12-ingredient-name-and-measure">
              { element.strIngredient13 }
              {element.strMeasure13}
            </p>
            <p data-testid="13-ingredient-name-and-measure">
              { element.strIngredient14 }
              {element.strMeasure14}
            </p>
            <p data-testid="14-ingredient-name-and-measure">
              { element.strIngredient15 }
              {element.strMeasure15}
            </p>
            <p data-testid="15-ingredient-name-and-measure">
              { element.strIngredient16 }
              {element.strMeasure16}
            </p>
            <p data-testid="16-ingredient-name-and-measure">
              { element.strIngredient17 }
              {element.strMeasure17}
            </p>
            <p data-testid="17-ingredient-name-and-measure">
              { element.strIngredient18 }
              {element.strMeasure18}
            </p>
            <p data-testid="18-ingredient-name-and-measure">
              { element.strIngredient19 }
              {element.strMeasure19}
            </p>
            <p data-testid="19-ingredient-name-and-measure">
              { element.strIngredient20 }
              {element.strMeasure20}
            </p>
            <p data-testid="instructions">{element.strInstructions}</p>
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ element.strYoutube }
              title="YouTube video player"
              allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </div>
        ))
      }

      {
        dataValue.drinks && dataValue.drinks.map((element) => (
          <div key={ element.strDrink }>
            <img
              data-testid="recipe-photo"
              src={ element.strDrinkThumb }
              alt={ element.strDrink }
            />
            <h2 data-testid="recipe-title">{ element.strDrink }</h2>
            <h4 data-testid="recipe-category">{ element.strCategory }</h4>
            <p data-testid="0-ingredient-name-and-measure">
              {
                ` ${element.strIngredient1} - ${element.strMeasure1} `
              }
            </p>
            <p data-testid="1-ingredient-name-and-measure">
              { element.strIngredient2 }
              -
              {element.strMeasure2}
            </p>
            <p data-testid="2-ingredient-name-and-measure">
              { element.strIngredient3 }
              {element.strMeasure3}
            </p>
            <p data-testid="3-ingredient-name-and-measure">
              { element.strIngredient4 }
              {element.strMeasure4}
            </p>
            <p data-testid="4-ingredient-name-and-measure">
              { element.strIngredient5 }
              {element.strMeasure5}
            </p>
            <p data-testid="5-ingredient-name-and-measure">
              { element.strIngredient6 }
              {element.strMeasure6}
            </p>
            <p data-testid="6-ingredient-name-and-measure">
              { element.strIngredient7 }
              {element.strMeasure7}
            </p>
            <p data-testid="7-ingredient-name-and-measure">
              { element.strIngredient8 }
              {element.strMeasure8}
            </p>
            <p data-testid="8-ingredient-name-and-measure">
              { element.strIngredient9 }
              {element.strMeasure9}
            </p>
            <p data-testid="9-ingredient-name-and-measure">
              { element.strIngredient10 }
              {element.strMeasure10}
            </p>
            <p data-testid="10-ingredient-name-and-measure">
              { element.strIngredient11 }
              {element.strMeasure11}
            </p>
            <p data-testid="11-ingredient-name-and-measure">
              { element.strIngredient12 }
              {element.strMeasure12}
            </p>
            <p data-testid="12-ingredient-name-and-measure">
              { element.strIngredient13 }
              {element.strMeasure13}
            </p>
            <p data-testid="13-ingredient-name-and-measure">
              { element.strIngredient14 }
              {element.strMeasure14}
            </p>
            <p data-testid="14-ingredient-name-and-measure">
              { element.strIngredient15 }
              {element.strMeasure15}
            </p>
            <p data-testid="15-ingredient-name-and-measure">
              { element.strIngredient16 }
              {element.strMeasure16}
            </p>
            <p data-testid="16-ingredient-name-and-measure">
              { element.strIngredient17 }
              {element.strMeasure17}
            </p>
            <p data-testid="17-ingredient-name-and-measure">
              { element.strIngredient18 }
              {element.strMeasure18}
            </p>
            <p data-testid="18-ingredient-name-and-measure">
              { element.strIngredient19 }
              {element.strMeasure19}
            </p>
            <p data-testid="19-ingredient-name-and-measure">
              { element.strIngredient20 }
              {element.strMeasure20}
            </p>
            <p data-testid="instructions">{element.strInstructions}</p>
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ element.strYoutube }
              title="YouTube video player"
              allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </div>
        ))
      }
    </div>
  );
}

export default RecipeDetails;
