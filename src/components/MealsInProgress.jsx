/* eslint-disable react/jsx-max-depth */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import MainContext from '../context/MainContext';
import LocalStorageContext from '../context/LocalStorageContext';
import notFavorited from '../images/whiteHeartIcon.svg';
import favorited from '../images/blackHeartIcon.svg';
import '../style/RecipeInProgress.css';
import '../style/MealsInProgress.css';
import beef from '../images/beef.png';
import breakfast from '../images/breakfast.png';
import chicken from '../images/chicken.png';
import dessert from '../images/dessert.png';
import goat from '../images/goat.png';
import ordinary from '../images/ordinary.png';
import cocktail from '../images/cocktail.png';
import shake from '../images/shake.png';
import other from '../images/other.png';
import cocoa from '../images/cocoa.png';
import foodDrink from '../images/food-drink.png';

const copy = require('clipboard-copy');

function MealsInProgress() {
  const { functions } = useContext(LocalStorageContext);
  const { detailsFetch } = useContext(MainContext);
  const [isShared, setIsShared] = useState(false);

  const history = useHistory();

  function handleCategory(category) {
    switch (category) {
    case 'Beef':
      return beef;
    case 'Breakfast':
      return breakfast;
    case 'Chicken':
      return chicken;
    case 'Dessert':
      return dessert;
    case 'Goat':
      return goat;
    case 'Ordinary Drink':
      return ordinary;
    case 'Cocktail':
      return cocktail;
    case 'Shake':
      return shake;
    case 'Other / Unknown':
      return other;
    case 'Cocoa':
      return cocoa;
    default:
      return foodDrink;
    }
  }

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
    functions.removeInProgress('meals', recipe.idMeal);
    const recipeTags = recipe.strTags ? recipe.strTags.split(',') : [];
    const tags = recipeTags.length === 0 ? [] : recipeTags;

    const doneDate = new Date().toISOString();

    const doneRecipe = {
      id: recipe.idMeal,
      type: 'meal',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate,
      tags,
    };
    functions.addDoneRecipe(doneRecipe);
    history.push('/done-recipes');
  }

  return (
    <div>
      {
        detailsFetch.dataValue.meals && detailsFetch.dataValue.meals.map((item) => (
          <div className="inprogress-container" key={ item.strMeal }>
            <div className="inprogress-header">
              <img
                className="inprogress-header-image"
                data-testid="recipe-photo"
                src={ item.strMealThumb }
                alt={ item.strMeal }
              />
              <div className="inprogress-header-btn-container">
                <div className="inprogress-btn-container">
                  <button
                    className="inprogress-header-btn-share"
                    data-testid="share-btn"
                    onClick={ handleClickShare }
                  >
                    <img src={ shareIcon } alt="share" />
                  </button>
                  <button
                    className="inprogress-header-btn-fav"
                    onClick={ () => functions.handleFavorite({
                      id: item.idMeal,
                      type: 'meal',
                      nationality: item.strArea,
                      category: item.strCategory,
                      alcoholicOrNot: '',
                      name: item.strMeal,
                      image: item.strMealThumb,
                    }) }
                  >
                    {functions.isFavoriteRecipe(item.idMeal) ? blackHeart : whiteHeart}
                  </button>
                </div>
                {
                  isShared && (
                    <small
                      className="inprogress-header-shared"
                    >
                      Link copied!
                    </small>)
                }

              </div>
              <div className="inprogress-category-container">
                <img src={ handleCategory(item.strCategory) } alt="category" />
                <h4 data-testid="recipe-category">{ item.strCategory }</h4>
              </div>
              <div className="inprogress-title-container">
                <h2 data-testid="recipe-title">{ item.strMeal }</h2>
              </div>
            </div>
            <div className="inprogress-ingredients-container">
              <h3 className="inprogress-ingredients-title">Ingredients</h3>
              {
                ingredients.map((element, index) => {
                  const { idMeal } = item;
                  const checked = functions.isAddedIngredient('meals', idMeal, element);
                  return (
                    <div
                      className="inprogress-checkbox-container"
                      key={ `${element}${index}` }
                    >
                      <input
                        className="form-check-input inprogress-checkbox"
                        type="checkbox"
                        name={ `${element}${index}` }
                        id={ `${element}${index}` }
                        checked={ checked }
                        onChange={ () => {
                          functions.handleIngredient('meals', idMeal, element);
                        } }
                      />
                      <label
                        className={ checked ? 'line-through' : '' }
                        htmlFor={ `${element}${index}` }
                        data-testid={ `${index}-ingredient-step` }
                      >
                        {
                          ` ${element}`
                        }
                      </label>

                    </div>
                  );
                })
              }
            </div>
            <div className="inprogress-instruction-container">
              <h3 className="inprogress-ingredients-title">Instructions</h3>
              <p data-testid="instructions">{item.strInstructions}</p>
            </div>
            <button
              className="inprogress-btn-finish"
              data-testid="finish-recipe-btn"
              disabled={ !functions.isDoneRecipe('meals', item.idMeal, ingredients) }
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

export default MealsInProgress;
