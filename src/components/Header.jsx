import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import imgProfile from '../images/profileIcon.svg';
import imgSearch from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

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
    <div>
      <Link to="/profile">
        <img
          src={ imgProfile }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </Link>

      {
        (pathname === '/meals' || pathname === '/drinks') && (
          <button onClick={ () => setInputDisabled(!inputDisabled) }>
            <img
              src={ imgSearch }
              alt="search"
              data-testid="search-top-btn"
            />
          </button>
        )
      }
      <h1 data-testid="page-title">{handleTitle()}</h1>

      {
        inputDisabled && <SearchBar />
      }
    </div>
  );
}

export default Header;
