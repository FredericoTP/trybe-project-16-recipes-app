import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainContext from '../context/MainContext';
import RecipeDetails from './RecipeDetails';

function MealsDetails() {
  const { dataValue, fetchApi } = useContext(MainContext);
  const history = useHistory();
  const { pathname } = history.location;
  useEffect(() => {
    const fetchDetails = async () => {
      const idMeals = pathname.split('/')[2];
      await fetchApi(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeals}`);
    };
    fetchDetails();
  }, []);

  return (
    <div>
      {
        dataValue.meals && <RecipeDetails />
      }
    </div>
  );
}

export default MealsDetails;
