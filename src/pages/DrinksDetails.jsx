import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainContext from '../context/MainContext';
import RecipeDetails from './RecipeDetails';

function DrinksDetails() {
  const { dataValue, fetchApi } = useContext(MainContext);
  const history = useHistory();
  const { pathname } = history.location;
  useEffect(() => {
    const fetchDetails = async () => {
      const idDrinks = pathname.split('/')[2];
      console.log(idDrinks);
      await fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrinks}
      `);
    };
    fetchDetails();
  }, []);

  return (
    <div>
      {
        dataValue.drinks && <RecipeDetails />
      }
    </div>
  );
}

export default DrinksDetails;
