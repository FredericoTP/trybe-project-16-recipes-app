import React from 'react';
import { useHistory } from 'react-router-dom';
import imgProfile from '../images/profileIcon.svg';
import imgSearch from '../images/searchIcon.svg';

function Header() {
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
      <button>
        <img
          src={ imgProfile }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </button>
      {
        (pathname === '/meals' || pathname === '/drinks') && (
          <button>
            <img
              src={ imgSearch }
              alt="search"
              data-testid="search-top-btn"
            />
          </button>
        )
      }
      <h1 data-testid="page-title">{handleTitle()}</h1>
    </div>
  );
}

export default Header;
