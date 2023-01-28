import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import LocalStorageProvider from '../context/LocalStorageProvider';
import '../style/ButtonRecipeDetails.css';

function ButtonRecipeDetails() {
  const { id } = useParams();
  const {
    values: { doneRecipes, favoriteRecipes, inProgressRecipes },
  } = useContext(LocalStorageProvider);

  function isDone() {
    if (doneRecipes.length > 0) {
      return JSON.parse(doneRecipes).some((item) => item.id === id);
    }
    return true;
  }

  return (
    <div>
      {
        isDone() && (
          <button
            className="btn-recipe-details"
            data-testid="start-recipe-btn"
          >
            Start Recipe
          </button>
        )
      }
    </div>
  );
}

export default ButtonRecipeDetails;
