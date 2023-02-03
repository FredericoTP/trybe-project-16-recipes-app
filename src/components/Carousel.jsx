/* eslint-disable no-magic-numbers */
import React, { useContext } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import MainContext from '../context/MainContext';
import '../style/Carousel.css';

export default function Carousel() {
  const { carouselFetch } = useContext(MainContext);
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    carouselFetch.dataValue.drinks ? (
      <Slider { ...settings }>
        {
          carouselFetch.dataValue.drinks.map((item, index) => (
            <div
              key={ index }
              className="carosel"
              data-testid={ `${index}-recommendation-card` }
            >
              <img src={ item.strDrinkThumb } alt="drink" />
              <Link className="carousel-link" to={ `/drinks/${item.idDrink}` }>
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
          carouselFetch.dataValue.meals.map((item, index) => (
            <div
              key={ index }
              className="carosel"
              data-testid={ `${index}-recommendation-card` }
            >
              <img src={ item.strMealThumb } alt="drink" />
              <Link className="carousel-link" to={ `/meals/${item.idMeal}` }>
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
