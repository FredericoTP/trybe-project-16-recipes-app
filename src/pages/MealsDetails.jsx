import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainContext from '../context/MainContext';
import RecipeDetails from '../components/RecipeDetails';

function MealsDetails() {
  const { id } = useParams();
  const { fetchApi, detailsFetch } = useContext(MainContext);
  useEffect(() => {
    const fetchDetails = async () => {
      await detailsFetch.fetchApiFiltered(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      await fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    };
    fetchDetails();
  }, []);
  console.log(detailsFetch.dataValue);
  return (
    <div>
      {
        detailsFetch.dataValue.meals && <RecipeDetails />
      }
    </div>
  );
}

export default MealsDetails;
