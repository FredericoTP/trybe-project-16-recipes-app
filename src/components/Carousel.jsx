import React, { useContext } from 'react';
import Slider from 'react-slick';
import MainContext from '../context/MainContext';
import '../style/Carousel.css';

export default function Carousel() {
  const { carouselFetch } = useContext(MainContext);
  const settings = {
    dots: true,
    infinite: false,
    speed: 200,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    carouselFetch.dataValue.drinks ? (
      <Slider { ...settings }>
        <div className="carosel" data-testid="0-recommendation-card">
          <img src={ carouselFetch.dataValue.drinks[0].strDrinkThumb } alt="drink" />
          <h3
            data-testid="0-recommendation-title"
          >
            { carouselFetch.dataValue.drinks[0].strDrink}

          </h3>
        </div>
        <div className="carosel" data-testid="1-recommendation-card">
          <img src={ carouselFetch.dataValue.drinks[1].strDrinkThumb } alt="drink" />
          <h3
            data-testid="1-recommendation-title"
          >
            { carouselFetch.dataValue.drinks[1].strDrink}

          </h3>
        </div>
        <div className="carosel" data-testid="2-recommendation-card">
          <img src={ carouselFetch.dataValue.drinks[2].strDrinkThumb } alt="drink" />
          <h3
            data-testid="2-recommendation-title"
          >
            { carouselFetch.dataValue.drinks[2].strDrink}

          </h3>
        </div>
        <div className="carosel" data-testid="3-recommendation-card">
          <img src={ carouselFetch.dataValue.drinks[3].strDrinkThumb } alt="drink" />
          <h3
            data-testid="3-recommendation-title"
          >
            { carouselFetch.dataValue.drinks[3].strDrink}

          </h3>
        </div>
        <div className="carosel" data-testid="4-recommendation-card">
          <img src={ carouselFetch.dataValue.drinks[4].strDrinkThumb } alt="drink" />
          <h3
            data-testid="4-recommendation-title"
          >
            { carouselFetch.dataValue.drinks[4].strDrink}

          </h3>
        </div>
        <div className="carosel" data-testid="5-recommendation-card">
          <img src={ carouselFetch.dataValue.drinks[5].strDrinkThumb } alt="drink" />
          <h3
            data-testid="5-recommendation-title"
          >
            { carouselFetch.dataValue.drinks[5].strDrink}

          </h3>
        </div>
      </Slider>
    ) : carouselFetch.dataValue.meals && (
      <Slider { ...settings }>
        <div className="carosel" data-testid="0-recommendation-card">
          <img src={ carouselFetch.dataValue.meals[0].strMealThumb } alt="Meal" />
          <h3
            data-testid="0-recommendation-title"
          >
            { carouselFetch.dataValue.meals[0].strMeal }

          </h3>
        </div>
        <div className="carosel" data-testid="1-recommendation-card">
          <img src={ carouselFetch.dataValue.meals[1].strMealThumb } alt="Meal" />
          <h3
            data-testid="1-recommendation-title"
          >
            { carouselFetch.dataValue.meals[1].strMeal }

          </h3>
        </div>
        <div className="carosel" data-testid="2-recommendation-card">
          <img src={ carouselFetch.dataValue.meals[2].strMealThumb } alt="Meal" />
          <h3
            data-testid="2-recommendation-title"
          >
            { carouselFetch.dataValue.meals[2].strMeal }

          </h3>
        </div>
        <div className="carosel" data-testid="3-recommendation-card">
          <img src={ carouselFetch.dataValue.meals[3].strMealThumb } alt="Meal" />
          <h3
            data-testid="3-recommendation-title"
          >
            { carouselFetch.dataValue.meals[3].strMeal }

          </h3>
        </div>
        <div className="carosel" data-testid="4-recommendation-card">
          <img src={ carouselFetch.dataValue.meals[4].strMealThumb } alt="Meal" />
          <h3
            data-testid="4-recommendation-title"
          >
            { carouselFetch.dataValue.meals[4].strMeal }

          </h3>
        </div>
        <div className="carosel" data-testid="5-recommendation-card">
          <img src={ carouselFetch.dataValue.meals[5].strMealThumb } alt="Meal" />
          <h3
            data-testid="5-recommendation-title"
          >
            { carouselFetch.dataValue.meals[5].strMeal }

          </h3>
        </div>
      </Slider>
    )
  );
}
