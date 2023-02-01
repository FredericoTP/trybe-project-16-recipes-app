import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function useFetch() {
  const [dataValue, setDataValue] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function redirect(data) {
    if (data.meals && (data.meals.length === 1)) {
      history.push(`/meals/${data.meals[0].idMeal}`);
    }
    if (data.drinks && (data.drinks.length === 1)) {
      history.push(`/drinks/${data.drinks[0].idDrink}`);
    }
    if (!data.drinks && !data.meals) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }

  const fetchApi = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      redirect(data);
      setDataValue(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchApiFiltered = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDataValue(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    dataValue,
    error,
    loading,
    fetchApi,
    setDataValue,
    fetchApiFiltered,
  };
}

export default useFetch;
