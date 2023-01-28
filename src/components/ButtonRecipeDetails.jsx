import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import LocalStorageContext from '../context/LocalStorageContext';
import '../style/ButtonRecipeDetails.css';

function ButtonRecipeDetails() {
  const { id } = useParams();
  const {
    values: { doneRecipes, favoriteRecipes, inProgressRecipes },
  } = useContext(LocalStorageContext);

  function isDone() {
    if (doneRecipes.length > 0) {
      return doneRecipes.some((item) => item.id === id);
    }
    return true;
  }

  console.log('usar nos próximos requesitos', favoriteRecipes, inProgressRecipes);

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
