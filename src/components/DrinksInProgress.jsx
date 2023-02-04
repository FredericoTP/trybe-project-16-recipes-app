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
import beef from '../images/beef.svg';
import breakfast from '../images/breakfast.svg';
import chicken from '../images/chicken.svg';
import dessert from '../images/dessert.svg';
import goat from '../images/goat.svg';
import ordinary from '../images/ordinary.svg';
import cocktail from '../images/cocktail.svg';
import shake from '../images/shake.svg';
import other from '../images/other.svg';
import cocoa from '../images/cocoa.svg';
import foodDrink from '../images/food-drink.svg';

const copy = require('clipboard-copy');

function DrinksInProgress() {
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
    functions.removeInProgress('drinks', recipe.idDrink);
    const recipeTags = recipe.strTags ? recipe.strTags.split(',') : [];
    const tags = recipeTags.length === 0 ? [] : recipeTags;

    const doneDate = new Date().toISOString();

    const doneRecipe = {
      id: recipe.idDrink,
      type: 'drink',
      nationality: '',
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
          <div className="inprogress-container" key={ item.strDrink }>
            <div className="inprogress-header">
              <img
                className="inprogress-header-image"
                data-testid="recipe-photo"
                src={ item.strDrinkThumb }
                alt={ item.strDrink }
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
                <img
                  className="inprogress-category-icon"
                  src={ handleCategory(item.strCategory) }
                  alt="category"
                />
                <h4 data-testid="recipe-category">{ item.strCategory }</h4>
              </div>
              <div className="inprogress-title-container">
                <h2 data-testid="recipe-title">{ item.strDrink }</h2>
              </div>
            </div>
            <div className="inprogress-ingredients-container">
              <h3 className="inprogress-ingredients-title">Ingredients</h3>
              {
                ingredients.map((element, index) => {
                  const { idDrink } = item;
                  const checked = functions.isAddedIngredient('drinks', idDrink, element);
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
                          functions.handleIngredient('drinks', idDrink, element);
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
