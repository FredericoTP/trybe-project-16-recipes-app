import React, { useContext } from 'react';
import MainContext from '../context/MainContext';
import '../style/Footer.css';

export default function Carrousel() {
  const { dataValue } = useContext(MainContext);
  return (
    <div>
      <div id="carouselExample" className="carousel slide ">
        <div className="carousel-inner ">
          <div className="carousel-item active">
            <img
              src={ dataValue.drinks && dataValue.drinks[1].strDrinkThumb }
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={ dataValue.drinks && dataValue.drinks[2].strDrinkThumb }
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={ dataValue.drinks && dataValue.drinks[3].strDrinkThumb }
              className="d-block w-100"
              alt="..."
            />
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
    </div>
  );
}
