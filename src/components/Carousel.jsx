import React, { useContext } from 'react';
import Slider from 'react-slick';
import MainContext from '../context/MainContext';
import '../style/Carousel.css';

export default function Carousel() {
  const { dataValue } = useContext(MainContext);
  const settings = {
    dots: true,
    infinite: false,
    speed: 200,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    dataValue.drinks ? (
      <Slider { ...settings }>
        <div className="carosel" data-testid="0-recommendation-card">
          <img src={ dataValue.drinks[0].strDrinkThumb } alt="drink" />
          <h3 data-testid="0-recommendation-title">{ dataValue.drinks[0].strDrink}</h3>
        </div>
        <div className="carosel" data-testid="1-recommendation-card">
          <img src={ dataValue.drinks[1].strDrinkThumb } alt="drink" />
          <h3 data-testid="1-recommendation-title">{ dataValue.drinks[1].strDrink}</h3>
        </div>
        <div className="carosel" data-testid="2-recommendation-card">
          <img src={ dataValue.drinks[2].strDrinkThumb } alt="drink" />
          <h3 data-testid="2-recommendation-title">{ dataValue.drinks[2].strDrink}</h3>
        </div>
        <div className="carosel" data-testid="3-recommendation-card">
          <img src={ dataValue.drinks[3].strDrinkThumb } alt="drink" />
          <h3 data-testid="3-recommendation-title">{ dataValue.drinks[3].strDrink}</h3>
        </div>
        <div className="carosel" data-testid="4-recommendation-card">
          <img src={ dataValue.drinks[4].strDrinkThumb } alt="drink" />
          <h3 data-testid="4-recommendation-title">{ dataValue.drinks[4].strDrink}</h3>
        </div>
        <div className="carosel" data-testid="5-recommendation-card">
          <img src={ dataValue.drinks[5].strDrinkThumb } alt="drink" />
          <h3 data-testid="5-recommendation-title">{ dataValue.drinks[5].strDrink}</h3>
        </div>
      </Slider>
    ) : dataValue.meals && (
      <Slider { ...settings }>
        <div className="carosel" data-testid="0-recommendation-card">
          <img src={ dataValue.meals[0].strMealThumb } alt="Meal" />
          <h3 data-testid="0-recommendation-title">{ dataValue.meals[0].strMeal }</h3>
        </div>
        <div className="carosel" data-testid="1-recommendation-card">
          <img src={ dataValue.meals[1].strMealThumb } alt="Meal" />
          <h3 data-testid="1-recommendation-title">{ dataValue.meals[1].strMeal }</h3>
        </div>
        <div className="carosel" data-testid="2-recommendation-card">
          <img src={ dataValue.meals[2].strMealThumb } alt="Meal" />
          <h3 data-testid="2-recommendation-title">{ dataValue.meals[2].strMeal }</h3>
        </div>
        <div className="carosel" data-testid="3-recommendation-card">
          <img src={ dataValue.meals[3].strMealThumb } alt="Meal" />
          <h3 data-testid="3-recommendation-title">{ dataValue.meals[3].strMeal }</h3>
        </div>
        <div className="carosel" data-testid="4-recommendation-card">
          <img src={ dataValue.meals[4].strMealThumb } alt="Meal" />
          <h3 data-testid="4-recommendation-title">{ dataValue.meals[4].strMeal }</h3>
        </div>
        <div className="carosel" data-testid="5-recommendation-card">
          <img src={ dataValue.meals[5].strMealThumb } alt="Meal" />
          <h3 data-testid="5-recommendation-title">{ dataValue.meals[5].strMeal }</h3>
        </div>
      </Slider>
    )
  );
}
