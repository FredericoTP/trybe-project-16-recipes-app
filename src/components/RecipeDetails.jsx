/* eslint-disable react/jsx-max-depth */
import React, { useContext, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import MainContext from '../context/MainContext';
import Carousel from './Carousel';
import ButtonRecipeDetails from './ButtonRecipeDetails';
import LocalStorageContext from '../context/LocalStorageContext';
import notFavorited from '../images/whiteHeartIcon.svg';
import favorited from '../images/blackHeartIcon.svg';
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
import '../style/RecipeDetails.css';

function RecipeDetails() {
  const { functions } = useContext(LocalStorageContext);
  const { detailsFetch } = useContext(MainContext);
  const [isShared, setIsShared] = useState(false);

  const whiteHeart = <img src={ notFavorited } data-testid="favorite-btn" alt="share" />;
  const blackHeart = <img src={ favorited } data-testid="favorite-btn" alt="share" />;

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

  function handleClickShare() {
    navigator.clipboard.writeText(window.location.href);
    setIsShared(true);
  }

  return (
    <div className="details-info">
      {
        detailsFetch.dataValue.meals && detailsFetch.dataValue.meals.map((item) => (
          <div className="details-container" key={ item.strMeal }>
            <div className="details-header">
              <div className="details-header-category">
                <img src={ handleCategory(item.strCategory) } alt="category" />
                <h4 data-testid="recipe-category">{ item.strCategory }</h4>
              </div>
              <h2 data-testid="recipe-title">{ item.strMeal }</h2>
              <div className="details-header-buttons">
                <div>
                  <button
                    className="details-share-btn"
                    data-testid="share-btn"
                    onClick={ handleClickShare }
                  >
                    <img src={ shareIcon } alt="share" />
                  </button>
                  <button
                    className="details-favorite-btn"
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
                  isShared && <small>Link copied!</small>
                }
              </div>
            </div>
            <img
              className="details-image"
              data-testid="recipe-photo"
              src={ item.strMealThumb }
              alt={ item.strMeal }
            />
            <div className="details-ingredients">
              <ul>
                {
                  getItens().filter((el) => el.length > 2).map((element, index) => (
                    <li
                      key={ `${element}${index}` }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {
                        ` ${element}`
                      }
                    </li>
                  ))
                }
              </ul>
            </div>
            <p
              className="details-instructions"
              data-testid="instructions"
            >
              {item.strInstructions}

            </p>
            <Carousel />
          </div>
        ))
      }

      {
        detailsFetch.dataValue.drinks && detailsFetch.dataValue.drinks.map((item) => (
          <div className="details-container" key={ item.strDrink }>
            <div className="details-header">
              <div className="details-header-category">
                <img src={ handleCategory(item.strCategory) } alt="category" />
                <h4 data-testid="recipe-category">{ item.strCategory }</h4>
              </div>
              <h2 data-testid="recipe-title">{ item.strDrink }</h2>
              <div className="details-header-buttons">
                <div>
                  <button
                    className="details-share-btn"
                    data-testid="share-btn"
                    onClick={ handleClickShare }
                  >
                    <img src={ shareIcon } alt="share" />
                  </button>
                  <button
                    className="details-favorite-btn"
                    onClick={ () => functions.handleFavorite({
                      id: item.idDrink,
                      type: 'Drink',
                      nationality: item.strArea,
                      category: item.strCategory,
                      alcoholicOrNot: '',
                      name: item.strDrink,
                      image: item.strDrinkThumb,
                    }) }
                  >
                    {functions.isFavoriteRecipe(item.idDrink) ? blackHeart : whiteHeart}
                  </button>
                </div>
                {
                  isShared && <small>Link copied!</small>
                }
              </div>
            </div>
            <img
              className="details-image"
              data-testid="recipe-photo"
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
            />
            <div className="details-ingredients">
              <ul>
                {
                  getItens().filter((el) => el.length > 2).map((element, index) => (
                    <li
                      key={ `${element}${index}` }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {
                        ` ${element}`
                      }
                    </li>
                  ))
                }
              </ul>
            </div>
            <p
              className="details-instructions"
              data-testid="instructions"
            >
              {item.strInstructions}

            </p>
            <Carousel />
          </div>
        ))
      }
      <ButtonRecipeDetails />
    </div>
  );
}

export default RecipeDetails;
