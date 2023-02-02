/* eslint-disable no-magic-numbers */
import React, { useContext } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import MainContext from '../context/MainContext';
import '../style/Carousel.css';

export default function Carousel() {
  const { carouselFetch } = useContext(MainContext);
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    carouselFetch.dataValue.drinks ? (
      <Slider { ...settings }>
        {
          carouselFetch.dataValue.drinks.splice(0, 6).map((item, index) => (
            <div
              key={ index }
              className="carosel"
              data-testid={ `${index}-recommendation-card` }
            >
              <img src={ item.strDrinkThumb } alt="drink" />
              <Link to={ `/drinks/${item.idDrink}` }>
                <h3
                  data-testid={ `${index}-recommendation-title` }
                >
                  { item.strDrink}
                </h3>
              </Link>
            </div>
          ))
        }
      </Slider>
    ) : carouselFetch.dataValue.meals && (
      <Slider { ...settings }>
        {
          carouselFetch.dataValue.meals.splice(0, 6).map((item, index) => (
            <div
              key={ index }
              className="carosel"
              data-testid={ `${index}-recommendation-card` }
            >
              <img src={ item.strMealThumb } alt="drink" />
              <Link to={ `/meals/${item.idMeal}` }>
                <h3
                  data-testid={ `${index}-recommendation-title` }
                >
                  { item.strMeal}
                </h3>
              </Link>
            </div>
          ))
        }
      </Slider>
    )
  );
}
