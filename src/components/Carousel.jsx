import React, { useContext } from 'react';
import MainContext from '../context/MainContext';
import '../style/Carousel.css';

export default function Carousel() {
  const { dataValue } = useContext(MainContext);
  return (
    <div>
      {
        dataValue.drinks && (
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active container-items">
                <div data-testid="0-recommendation-card">
                  <img
                    src={ dataValue.drinks[0].strDrinkThumb }
                    className="d-block w-100"
                    alt="..."
                  />
                  <h4
                    data-testid="0-recommendation-title"
                  >
                    { dataValue.drinks[0].strDrink }
                  </h4>
                </div>
                <div data-testid="1-recommendation-card">
                  <img
                    src={ dataValue.drinks[1].strDrinkThumb }
                    className="d-block w-100"
                    alt="..."
                  />
                  <h4
                    data-testid="1-recommendation-title"
                  >
                    { dataValue.drinks[1].strDrink }

                  </h4>
                </div>
              </div>
              <div className="carousel-item container-items">
                <div data-testid="2-recommendation-card">
                  <img
                    src={ dataValue.drinks[2].strDrinkThumb }
                    className="d-block w-100"
                    alt="..."
                  />
                  <h4
                    data-testid="2-recommendation-title"
                  >
                    { dataValue.drinks[2].strDrink }

                  </h4>
                </div>
                <div data-testid="3-recommendation-card">
                  <img
                    src={ dataValue.drinks[3].strDrinkThumb }
                    className="d-block w-100"
                    alt="..."
                  />
                  <h4
                    data-testid="3-recommendation-title"
                  >
                    { dataValue.drinks[3].strDrink }

                  </h4>
                </div>
              </div>
              <div className="carousel-item container-items">
                <div data-testid="4-recommendation-card">
                  <img
                    src={ dataValue.drinks[4].strDrinkThumb }
                    className="d-block w-100"
                    alt="..."
                  />
                  <h4
                    data-testid="4-recommendation-title"
                  >
                    { dataValue.drinks[4].strDrink }

                  </h4>
                </div>
                <div data-testid="5-recommendation-card">
                  <img
                    src={ dataValue.drinks[5].strDrinkThumb }
                    className="d-block w-100"
                    alt="..."
                  />
                  <h4
                    data-testid="5-recommendation-title"
                  >
                    { dataValue.drinks[5].strDrink }

                  </h4>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        )
      }
      {
        dataValue.meals && (
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active container-items">
                <div data-testid="0-recommendation-card">
                  <img
                    src={ dataValue.meals[0].strMealThumb }
                    className="d-block w-100"
                    alt="..."
                  />
                  <h4
                    data-testid="0-recommendation-title"
                  >
                    { dataValue.meals[0].strMeal }
                  </h4>
                </div>
                <div data-testid="1-recommendation-card">
                  <img
                    src={ dataValue.meals[1].strMealThumb }
                    className="d-block w-100"
                    alt="..."
                  />
                  <h4
                    data-testid="1-recommendation-title"
                  >
                    { dataValue.meals[1].strMeal }

                  </h4>
                </div>
              </div>
              <div className="carousel-item container-items">
                <div data-testid="2-recommendation-card">
                  <img
                    src={ dataValue.meals[2].strMealThumb }
                    className="d-block w-100"
                    alt="..."
                  />
                  <h4
                    data-testid="2-recommendation-title"
                  >
                    { dataValue.meals[2].strMeal }

                  </h4>
                </div>
                <div data-testid="3-recommendation-card">
                  <img
                    src={ dataValue.meals[3].strMealThumb }
                    className="d-block w-100"
                    alt="..."
                  />
                  <h4
                    data-testid="3-recommendation-title"
                  >
                    { dataValue.meals[3].strMeal }

                  </h4>
                </div>
              </div>
              <div className="carousel-item container-items">
                <div data-testid="4-recommendation-card">
                  <img
                    src={ dataValue.meals[4].strMealThumb }
                    className="d-block w-100"
                    alt="..."
                  />
                  <h4
                    data-testid="4-recommendation-title"
                  >
                    { dataValue.meals[4].strMeal }

                  </h4>
                </div>
                <div data-testid="5-recommendation-card">
                  <img
                    src={ dataValue.meals[5].strMealThumb }
                    className="d-block w-100"
                    alt="..."
                  />
                  <h4
                    data-testid="5-recommendation-title"
                  >
                    { dataValue.meals[5].strMeal }

                  </h4>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        )
      }
    </div>
  );
}
