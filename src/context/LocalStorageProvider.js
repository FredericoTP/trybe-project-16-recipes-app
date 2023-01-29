import PropTypes from 'prop-types';
import { useMemo } from 'react';
import LocalStorageContext from './LocalStorageContext';
import useLocalStorage from '../hook/useLocalStorage';

const teste = [{
  id: '52977',
  type: 'meal',
  nationality: 'Germany',
  category: 'side',
  alcoholicOrNot: '',
  name: 'Corba',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  doneDate: '28/02/2022',
  tags: ['food', 'exotic', 'best'],
}, {
  id: '15997',
  type: 'drink',
  nationality: '',
  category: '',
  alcoholicOrNot: 'Optional alcohol',
  name: 'GG',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  doneDate: '28/01/2023',
  tags: ['ala'],
}];

function LocalStorageProvider({ children }) {
  const [doneRecipes, setDoneRecipes] = useLocalStorage('doneRecipes', teste);
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
