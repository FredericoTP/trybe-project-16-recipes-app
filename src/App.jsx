import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import LoginProvider from './context/LoginProvider';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <LoginProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" render={ () => <Recipes /> } />
        <Route exact path="/drinks" render={ () => <Recipes /> } />
        <Route exact path="/meals/:id" render={ () => <RecipeDetails /> } />
        <Route exatc path="/drinks/:id" render={ () => <RecipeDetails /> } />
        <Route
          exact
          path="/meals/:id/in-progress"
          render={ () => <RecipeInProgress /> }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ () => <RecipeInProgress /> }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </LoginProvider>
  );
}

export default App;
