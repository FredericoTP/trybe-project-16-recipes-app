import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainContext from '../context/MainContext';
import RecipeDetails from './RecipeDetails';

function DrinksDetails() {
  const { id } = useParams();
  const { detailsFetch } = useContext(MainContext);

  useEffect(() => {
    const fetchDetails = async () => {
      await detailsFetch.fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    };
    fetchDetails();
  }, []);

  return (
    <div>
      {
        detailsFetch.dataValue.drinks && <RecipeDetails />
      }
    </div>
  );
}

export default DrinksDetails;
