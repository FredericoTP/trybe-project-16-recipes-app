import { useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import MainContext from '../context/MainContext';
import DrinksInProgress from '../components/DrinksInProgress';
import MealsInProgress from '../components/MealsInProgress';

function RecipeInProgress() {
  const { id } = useParams();
  const { detailsFetch } = useContext(MainContext);
  const history = useHistory();
  const { pathname } = history.location;
  const type = pathname.split('/')[1];

  useEffect(() => {
    const fetchDetails = async () => {
      if (type === 'meals') {
        await detailsFetch.fetchApiFiltered(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        return;
      }
      await detailsFetch.fetchApiFiltered(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    };
    fetchDetails();
  }, []);

  return <div>{type === 'meals' ? <MealsInProgress /> : <DrinksInProgress />}</div>;
}

export default RecipeInProgress;
