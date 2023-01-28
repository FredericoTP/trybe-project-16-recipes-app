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

  function addFavorite({ id, type, nationality, category, alcoholicOrNot, name, image }) {
    const object = {
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    };
    setFavoriteRecipes([...favoriteRecipes, object]);
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
