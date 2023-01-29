import PropTypes from 'prop-types';
import { useMemo } from 'react';
import LocalStorageContext from './LocalStorageContext';
import useLocalStorage from '../hook/useLocalStorage';

function LocalStorageProvider({ children }) {
  const [doneRecipes, setDoneRecipes] = useLocalStorage('doneRecipes', []);
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  const [inProgressRecipes,
    setInProgressRecipes,
  ] = useLocalStorage('inProgressRecipes', {});

  function addFavorite(newRecipe) {
    setFavoriteRecipes([...favoriteRecipes, newRecipe]);
  }

  function removeFavorite(recipeId) {
    setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe.id !== recipeId));
  }

  function isFavoriteRecipe(recipeId) {
    return favoriteRecipes.some((recipe) => recipe.id === recipeId);
  }

  function handleFavorite(newRecipe) {
    if (isFavoriteRecipe(newRecipe.id)) return removeFavorite(newRecipe.id);
    addFavorite(newRecipe);
  }

  const localStorage = useMemo(() => ({
    values: {
      doneRecipes,
      favoriteRecipes,
      inProgressRecipes,
    },
    setters: {
      setDoneRecipes,
      setFavoriteRecipes,
      setInProgressRecipes,
    },
    functions: {
      addFavorite,
      removeFavorite,
      isFavoriteRecipe,
      handleFavorite,
    },
  }), [doneRecipes, favoriteRecipes, inProgressRecipes]);

  return (
    <LocalStorageContext.Provider value={ localStorage }>
      {children}
    </LocalStorageContext.Provider>
  );
}

LocalStorageProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default LocalStorageProvider;
