import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import MainContext from '../context/MainContext';
import LocalStorageContext from '../context/LocalStorageContext';
import notFavorited from '../images/whiteHeartIcon.svg';
import favorited from '../images/blackHeartIcon.svg';
import '../style/RecipeInProgress.css';

const copy = require('clipboard-copy');
const moment = require('moment');

function DrinksInProgress() {
  const { functions } = useContext(LocalStorageContext);
  const { detailsFetch } = useContext(MainContext);
  const [isShared, setIsShared] = useState(false);

  const history = useHistory();

  const whiteHeart = <img src={ notFavorited } data-testid="favorite-btn" alt="addFav" />;
  const blackHeart = <img src={ favorited } data-testid="favorite-btn" alt="rmvFav" />;

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
    const MINUS_TWELVE = -12;
    copy(window.location.href.slice(0, MINUS_TWELVE));
    setIsShared(true);
  }

  function handleClickFinish(recipe) {
    functions.removeInProgress('drinks', recipe.idDrink);
    const recipeTags = recipe.strTags ? recipe.strTags.split(',') : [];
    const tags = recipeTags.length === 0 ? [] : recipeTags;

    // const date = new Date();
    // const day = date.getDate();
    // const month = date.getMonth() + 1;
    // const year = date.getFullYear();
    // const doneDate = `${day}/${month}/${year}`;

    const doneDate = moment().format();

    const doneRecipe = {
      id: recipe.idDrink,
      type: 'drink',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate,
      tags,
    };
    functions.addDoneRecipe(doneRecipe);
    history.push('/done-recipes');
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
              ingredients.map((element, index) => {
                const { idDrink } = item;
                const checked = functions.isAddedIngredient('drinks', idDrink, element);
                return (
                  <label
                    className={ checked ? 'line-through' : '' }
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
                      checked={ checked }
                      onChange={ () => {
                        functions.handleIngredient('drinks', idDrink, element);
                      } }
                    />
                  </label>
                );
              })
            }
            <p data-testid="instructions">{item.strInstructions}</p>
            <iframe
              data-testid="video"
              title={ item.strDrink }
              width="420"
              height="315"
              src={ item.strYoutube }
            />
            <button
              data-testid="finish-recipe-btn"
              disabled={ !functions.isDoneRecipe('drinks', item.idDrink, ingredients) }
              onClick={ () => { handleClickFinish(item); } }
            >
              Finalizar Receita
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default DrinksInProgress;
