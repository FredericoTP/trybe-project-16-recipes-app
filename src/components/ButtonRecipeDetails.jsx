import { useParams } from 'react-router-dom';
import '../style/ButtonRecipeDetails.css';

function ButtonRecipeDetails() {
  const { id } = useParams();
  if (!localStorage.getItem('doneRecipes')) {
    localStorage.setItem('doneRecipes', []);
  }
  if (!localStorage.getItem('favoriteRecipes')) {
    localStorage.setItem('favoriteRecipes', []);
  }
  if (!localStorage.getItem('inProgressRecipes')) {
    localStorage.setItem('inProgressRecipes', {});
  }
  const doneRecipes = localStorage.getItem('doneRecipes');

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
