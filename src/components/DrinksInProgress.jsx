import React, { useContext, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import MainContext from '../context/MainContext';
import LocalStorageContext from '../context/LocalStorageContext';
import notFavorited from '../images/whiteHeartIcon.svg';
import favorited from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function DrinksInProgress() {
  const { functions } = useContext(LocalStorageContext);
  const { detailsFetch } = useContext(MainContext);
  const [isShared, setIsShared] = useState(false);

  const whiteHeart = <img src={ notFavorited } data-testid="favorite-btn" alt="share" />;
  const blackHeart = <img src={ favorited } data-testid="favorite-btn" alt="share" />;

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

  const ingredients = getItens().filter((el) => el.length > 2);

  function handleClickShare() {
    copy(window.location.href);
    setIsShared(true);
  }

  return (
    <div>
      {
        detailsFetch.dataValue.drinks && detailsFetch.dataValue.drinks.map((item) => (
          <div key={ item.strDrink }>
            <button
              data-testid="share-btn"
              onClick={ handleClickShare }
            >
              <img src={ shareIcon } alt="share" />
            </button>
            <button
              onClick={ () => functions.handleFavorite({
                id: item.idDrink,
                type: 'drink',
                nationality: (item.strArea ? item.strArea : ''),
                category: item.strCategory,
                alcoholicOrNot: item.strAlcoholic,
                name: item.strDrink,
                image: item.strDrinkThumb,
              }) }
            >
              {functions.isFavoriteRecipe(item.idDrink) ? blackHeart : whiteHeart}
            </button>
            {
              isShared && <small>Link copied!</small>
            }
            <img
              data-testid="recipe-photo"
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
            />
            <h2 data-testid="recipe-title">{ item.strDrink }</h2>
            <h4 data-testid="recipe-category">{ item.strAlcoholic }</h4>
            {
              ingredients.map((element, index) => (
                <label
                  htmlFor={ `${element}${index}` }
                  data-testid={ `${index}-ingredient-step` }
                  key={ `${element}${index}` }
                >
                  {
                    ` ${element}`
                  }
                  <input
                    type="checkbox"
                    name={ `${element}${index}` }
                    id={ `${element}${index}` }
                  />
                </label>
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
      <button
        data-testid="finish-recipe-btn"
        onClick={ () => functions.handleFavorite({
          id: item.idDrink,
          type: 'drink',
          nationality: (item.strArea ? item.strArea : ''),
          category: item.strCategory,
          alcoholicOrNot: item.strAlcoholic,
          name: item.strDrink,
          image: item.strDrinkThumb,
        }) }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default DrinksInProgress;
