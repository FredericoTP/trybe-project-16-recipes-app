import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import imgProfile from '../images/profileIcon.svg';
import imgSearch from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import imageHeader from '../images/logo-header.png';
import '../style/Header.css';
import imgMeal from '../images/mealIcon.svg';
import imgDrink from '../images/drinkIcon.svg';

function Header() {
  const [inputDisabled, setInputDisabled] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;

  function handleTitle() {
    switch (pathname) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return 'Profile';
    }
  }

  return (
    <div className="header-container">
      <div className="header-profile-search-container">
        <div className="header-logo-titile">
          <img className="header-logo" src={ imageHeader } alt="logo-header" />
          <h4>Recipe App</h4>
        </div>
        <div className="profile-search-container">
          <Link to="/profile">
            <img
              src={ imgProfile }
              alt="profile"
              data-testid="profile-top-btn"
            />
          </Link>

          {
            (pathname === '/meals' || pathname === '/drinks') && (
              <button
                className="header-btn-search"
                onClick={ () => setInputDisabled(!inputDisabled) }
              >
                <img
                  src={ imgSearch }
                  alt="search"
                  data-testid="search-top-btn"
                />
              </button>
            )
          }
        </div>
      </div>
      <div className="header-title-container">
        {
          pathname === '/meals' && <img src={ imgMeal } alt="meal" />
        }
        {
          pathname === '/drinks' && <img src={ imgDrink } alt="meal" />
        }
        <h1 className="header-title" data-testid="page-title">{handleTitle()}</h1>
      </div>

      {
        inputDisabled && <SearchBar />
      }
    </div>
  );
}

export default Header;
