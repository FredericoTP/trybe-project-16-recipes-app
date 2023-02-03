import React from 'react';
import Header from '../components/Header';
import FilterDoneRecipes from '../components/FilterDoneRecipes';
import ListFavorites from '../components/ListFavorites';
import Footer from '../components/Footer';

function FavoriteRecipes() {
  return (
    <div>
      <Header />
      <FilterDoneRecipes />
      <ListFavorites />
      <Footer />
    </div>
  );
}
export default FavoriteRecipes;
