import { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import MainContext from '../context/MainContext';
import Loading from '../components/Loading';

function Drinks() {
  const { loading, fetchApi, dataValue, categoryFetch } = useContext(MainContext);

  useEffect(() => {
    const callApi = async () => {
      await fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      categoryFetch.setDataValue([]);
      await categoryFetch.fetchApi('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    };

    callApi();
  }, []);

  if (loading || categoryFetch.loading) {
    return (
      <div>
        <Header />
        <Loading />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      {
        dataValue.drinks && <Recipes />
      }
      <Footer />
    </div>
  );
}

export default Drinks;
