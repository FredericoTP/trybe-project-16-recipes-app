import React from 'react';
import Header from '../components/Header';
import FilterDoneRecipes from '../components/FilterDoneRecipes';
import ListFavorites from '../components/ListFavorites';

function FavoriteRecipes() {
  return (
    <div>
      <Header />
      <FilterDoneRecipes />
      <ListFavorites />
    </div>
  );
}
export default FavoriteRecipes;
