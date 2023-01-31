import PropTypes from 'prop-types';
import { useMemo } from 'react';
import LocalStorageContext from './LocalStorageContext';
import useLocalStorage from '../hook/useLocalStorage';

function LocalStorageProvider({ children }) {
  const [doneRecipes, setDoneRecipes] = useLocalStorage('doneRecipes', []);
  const [favoriteRecipes,
    setFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  const [inProgressRecipes,
    setInProgressRecipes,
  ] = useLocalStorage('inProgressRecipes', { drinks: {}, meals: {} });

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

  function addInProgress(type, recipeId) {
    if (Object.keys(inProgressRecipes[type]).includes(recipeId)) return;
    const progress = {
      ...inProgressRecipes,
      [type]: { ...inProgressRecipes[type], [recipeId]: [] },
    };
    setInProgressRecipes(progress);
  }

  function removeInProgress(type, recipeId) {
    const removeId = ({ [recipeId]: removed, ...rest }) => (rest);
    const progress = {
      ...inProgressRecipes,
      [type]: removeId(inProgressRecipes[type]),
    };
    setInProgressRecipes(progress);
  }

  function addIngredient(type, recipeId, ingredient) {
    const progress = {
      ...inProgressRecipes,
      [type]: {
        ...inProgressRecipes[type],
        [recipeId]: [...inProgressRecipes[type][recipeId], ingredient],
      },
    };
    setInProgressRecipes(progress);
  }

  function removeIngredient(type, recipeId, ingredient) {
    const progress = {
      ...inProgressRecipes,
      [type]: {
        ...inProgressRecipes[type],
        [recipeId]: inProgressRecipes[type][recipeId].filter((ing) => ing !== ingredient),
      },
    };
    setInProgressRecipes(progress);
  }

  function isAddedIngredient(type, recipeId, ingredient) {
    if (!inProgressRecipes[type][recipeId]) return false;
    return inProgressRecipes[type][recipeId].includes(ingredient);
  }

  function handleIngredient(type, recipeId, ingredient) {
    if (isAddedIngredient(type, recipeId, ingredient)) {
      return removeIngredient(type, recipeId, ingredient);
    }
    addIngredient(type, recipeId, ingredient);
  }

  function isDoneRecipe(type, recipeId, recipe) {
    return recipe.every((ingredient) => isAddedIngredient(type, recipeId, ingredient));
  }

  function addDoneRecipe(doneRecipe) {
    setDoneRecipes([...doneRecipes, doneRecipe]);
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
      isFavoriteRecipe,
      handleFavorite,
      addInProgress,
      removeInProgress,
      handleIngredient,
      isAddedIngredient,
      isDoneRecipe,
      addDoneRecipe,
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
