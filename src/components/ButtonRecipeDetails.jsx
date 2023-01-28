import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import LocalStorageContext from '../context/LocalStorageContext';
import MainContext from '../context/MainContext';
import '../style/ButtonRecipeDetails.css';

function ButtonRecipeDetails() {
  const { id } = useParams();
  const {
    values: { doneRecipes, inProgressRecipes },
  } = useContext(LocalStorageContext);
  const { detailsFetch } = useContext(MainContext);

  function isDone() {
    if (doneRecipes) {
      return !doneRecipes.some((item) => item.id === id);
    }
    return true;
  }

  function inProgress() {
    if (inProgressRecipes) {
      if (inProgressRecipes.meals) {
        return !!inProgressRecipes.meals[id];
      }
      if (inProgressRecipes.drinks) {
        return !!inProgressRecipes.drinks[id];
      }
    }
    return false;
  }

  // favoriteRecipes

  return (
    <div>
      {
        (detailsFetch.dataValue.meals && isDone()) && (
          <Link
            to={ `/meals/${id}/in-progress` }
            className="btn-recipe-details"
            data-testid="start-recipe-btn"
          >
            { inProgress() ? 'Continue Recipe' : 'Start Recipe'}
          </Link>
        )
      }
      {
        (detailsFetch.dataValue.drinks && isDone()) && (
          <Link
            to={ `/drinks/${id}/in-progress` }
            className="btn-recipe-details"
            data-testid="start-recipe-btn"
          >
            { inProgress() ? 'Continue Recipe' : 'Start Recipe'}
          </Link>
        )
      }
    </div>
  );
}

export default ButtonRecipeDetails;
