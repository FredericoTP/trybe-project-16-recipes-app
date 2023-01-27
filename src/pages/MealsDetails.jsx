import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainContext from '../context/MainContext';
import RecipeDetails from './RecipeDetails';

function MealsDetails() {
  const { id } = useParams();
  const { detailsFetch } = useContext(MainContext);

  useEffect(() => {
    const fetchDetails = async () => {
      await detailsFetch.fetchApi(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    };
    fetchDetails();
  }, []);

  return (
    <div>
      {
        detailsFetch.dataValue.meals && <RecipeDetails />
      }
    </div>
  );
}

export default MealsDetails;
