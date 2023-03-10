import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainContext from '../context/MainContext';
import RecipeDetails from '../components/RecipeDetails';
import Loading from '../components/Loading';
import '../style/DrinksDetails.css';

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

  if (carouselFetch.loading || detailsFetch.loading) {
    return (
      <div className="drinksdetails-container">
        <Loading />
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
