import { useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import MainContext from '../context/MainContext';
import LocalStorageContext from '../context/LocalStorageContext';
import DrinksInProgress from '../components/DrinksInProgress';
import MealsInProgress from '../components/MealsInProgress';
import Loading from '../components/Loading';

function RecipeInProgress() {
  const { id } = useParams();
  const { detailsFetch } = useContext(MainContext);
  const { functions } = useContext(LocalStorageContext);
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
    functions.addInProgress(type, id);
  }, []);

  if (detailsFetch.loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return <div>{type === 'meals' ? <MealsInProgress /> : <DrinksInProgress />}</div>;
}

export default RecipeInProgress;
