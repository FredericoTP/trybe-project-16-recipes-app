import Header from '../components/Header';
import FilterDoneRecipes from '../components/FilterDoneRecipes';
import RecipesDone from '../components/RecipesDone';
import '../style/DoneRecipes.css';

function DoneRecipes() {
  return (
    <div className="donerecipes-container">
      <Header />
      <FilterDoneRecipes />
      <RecipesDone />
    </div>
  );
}

export default DoneRecipes;
