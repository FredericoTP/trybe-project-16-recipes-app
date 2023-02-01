import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainContext from '../context/MainContext';
import RecipeDetails from '../components/RecipeDetails';

function DrinksDetails() {
  const { id } = useParams();
  const { carouselFetch, detailsFetch } = useContext(MainContext);

  useEffect(() => {
    const fetchDetails = async () => {
      await detailsFetch.fetchApiFiltered(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      await carouselFetch.fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    };
    fetchDetails();
  }, []);

  if (carouselFetch.loadgin || detailsFetch.loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {
        detailsFetch.dataValue.drinks && <RecipeDetails />
      }
    </div>
  );
}

export default DrinksDetails;
