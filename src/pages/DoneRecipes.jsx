import Header from '../components/Header';
import FilterDoneRecipes from '../components/FilterDoneRecipes';
import RecipesDone from '../components/RecipesDone';
import '../style/DoneRecipes.css';
import Footer from '../components/Footer';

function DoneRecipes() {
  return (
    <div className="donerecipes-container">
      <Header />
      <FilterDoneRecipes />
      <RecipesDone />
      <Footer />
    </div>
  );
}

export default DoneRecipes;
