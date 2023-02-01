import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';
import meals from './mocks/meals';
import mealCategories from './mocks/mealCategories';
import emptyDrinks from './mocks/emptyDrinks';
import emptyMeals from './mocks/emptyMeals';
import ginDrinks from './mocks/ginDrinks';
import soupMeals from './mocks/soupMeals';
import mealsByIngredient from './mocks/mealsByIngredient';
import drinksByIngredient from './mocks/drinksByIngredient';
import oneDrinkId15997 from './mocks/oneDrinkId15997';
import oneMeal from './mocks/oneMeal';
import drinks from './mocks/drinks';
import drinkCategories from './mocks/drinkCategories';

describe('Teste SearchBar', () => {
  const BTNSEARCH = 'search-top-btn';
  const INPUTSEARCH = 'search-input';
  const INGREDIENTSEARCH = 'ingredient-search-radio';
  const NAMESEARCH = 'name-search-radio';
  const LETTERSEARCH = 'first-letter-search-radio';
  const SEARCHTOAPI = 'exec-search-btn';
  const FIRSTCARD = '0-card-name';

  test('Verifica SearchBar Meals', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(meals)
          .mockReturnValueOnce(meals)
          .mockReturnValueOnce(mealCategories)
          .mockReturnValueOnce(mealsByIngredient)
          .mockReturnValueOnce(soupMeals)
          .mockReturnValueOnce(emptyMeals),
      });
    });

    global.alert = jest.fn();

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    expect(history.location.pathname).toBe('/meals');

    const searchBtn = await screen.findByTestId(BTNSEARCH);

    await act(() => {
      userEvent.click(searchBtn);
    });

    const searchInput = await screen.findByTestId(INPUTSEARCH);
    expect(searchInput).toHaveValue('');

    act(() => {
      userEvent.type(searchInput, 'Chicken');
    });

    expect(searchInput).toHaveValue('Chicken');
    const ingredientRadio = await screen.findByTestId(INGREDIENTSEARCH);
    const searchApi = await screen.findByTestId(SEARCHTOAPI);

    await act(() => {
      userEvent.click(ingredientRadio);
      userEvent.click(searchApi);
    });

    expect(searchInput).toHaveValue('');
    const firstIngredientName = await screen.findByTestId(FIRSTCARD);
    expect(firstIngredientName).toHaveTextContent('Brown Stew Chicken');

    const nameRadio = await screen.findByTestId(NAMESEARCH);

    await act(() => {
      userEvent.type(searchInput, 'Soup');
      userEvent.click(nameRadio);
      userEvent.click(searchApi);
    });

    const firstName = await screen.findByTestId(FIRSTCARD);
    expect(firstName).toHaveTextContent('Leblebi Soup');

    await act(() => {
      userEvent.type(searchInput, 'Nectarina');
      userEvent.click(nameRadio);
      userEvent.click(searchApi);
    });

    expect(global.alert).toHaveBeenCalled();
    const letterRadio = await screen.findByTestId(LETTERSEARCH);

    await act(() => {
      userEvent.type(searchInput, 'c');
      userEvent.click(letterRadio);
      userEvent.click(searchApi);
    });

    const firstLetterName = await screen.findByTestId(FIRSTCARD);
    expect(firstLetterName).toHaveTextContent('Corba');

    await act(() => {
      userEvent.type(searchInput, 'cc');
      userEvent.click(letterRadio);
      userEvent.click(searchApi);
    });

    expect(global.alert).toHaveBeenCalledTimes(2);
  });

  test('Verifica retorno de apenas uma resposta em meals', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinks)
          .mockReturnValueOnce(meals)
          .mockReturnValueOnce(mealCategories)
          .mockReturnValueOnce(oneMeal),
      });
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    expect(history.location.pathname).toBe('/meals');

    const searchBtn = await screen.findByTestId(BTNSEARCH);

    await act(() => {
      userEvent.click(searchBtn);
    });

    const searchInput = await screen.findByTestId(INPUTSEARCH);

    act(() => {
      userEvent.type(searchInput, 'Spicy Arrabiata Penne');
    });

    const nameRadio = await screen.findByTestId(NAMESEARCH);
    const searchApi = await screen.findByTestId(SEARCHTOAPI);

    await act(() => {
      userEvent.click(nameRadio);
      userEvent.click(searchApi);
    });

    expect(history.location.pathname).toBe('/meals/52771');
  });

  test('Verifica SearchBar Drinks', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinks)
          .mockReturnValueOnce(drinks)
          .mockReturnValueOnce(drinkCategories)
          .mockReturnValueOnce(drinksByIngredient)
          .mockReturnValueOnce(ginDrinks)
          .mockReturnValueOnce(emptyDrinks),
      });
    });

    global.alert = jest.fn();

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));
    expect(history.location.pathname).toBe('/drinks');

    const searchBtn = await screen.findByTestId(BTNSEARCH);

    await act(() => {
      userEvent.click(searchBtn);
    });

    const searchInput = await screen.findByTestId(INPUTSEARCH);
    expect(searchInput).toHaveValue('');

    act(() => {
      userEvent.type(searchInput, 'light rum');
    });

    const ingredientRadio = await screen.findByTestId(INGREDIENTSEARCH);
    const searchApi = await screen.findByTestId(SEARCHTOAPI);

    await act(() => {
      userEvent.click(ingredientRadio);
      userEvent.click(searchApi);
    });

    expect(searchInput).toHaveValue('');
    const firstIngredientName = await screen.findByTestId(FIRSTCARD);
    expect(firstIngredientName).toHaveTextContent('151 Florida Bushwacker');

    const nameRadio = await screen.findByTestId(NAMESEARCH);

    await act(() => {
      userEvent.type(searchInput, 'Gin');
      userEvent.click(nameRadio);
      userEvent.click(searchApi);
    });

    const firstName = await screen.findByTestId(FIRSTCARD);
    expect(firstName).toHaveTextContent('Gin Fizz');

    await act(() => {
      userEvent.type(searchInput, 'Blue');
      userEvent.click(nameRadio);
      userEvent.click(searchApi);
    });

    expect(global.alert).toHaveBeenCalled();
    const letterRadio = await screen.findByTestId(LETTERSEARCH);

    await act(() => {
      userEvent.type(searchInput, 'g');
      userEvent.click(letterRadio);
      userEvent.click(searchApi);
    });

    const firstLetterName = await screen.findByTestId(FIRSTCARD);
    expect(firstLetterName).toHaveTextContent('GG');

    await act(() => {
      userEvent.type(searchInput, 'cc');
      userEvent.click(letterRadio);
      userEvent.click(searchApi);
    });

    expect(global.alert).toHaveBeenCalledTimes(2);
  });

  test('Verifica retorno de apenas uma resposta em drinks', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(meals)
          .mockReturnValueOnce(drinks)
          .mockReturnValueOnce(drinkCategories)
          .mockReturnValueOnce(oneDrinkId15997),
      });
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));
    expect(history.location.pathname).toBe('/drinks');

    const searchBtn = await screen.findByTestId(BTNSEARCH);

    await act(() => {
      userEvent.click(searchBtn);
    });

    const searchInput = await screen.findByTestId(INPUTSEARCH);

    act(() => {
      userEvent.type(searchInput, 'GG');
    });

    const nameRadio = await screen.findByTestId(NAMESEARCH);
    const searchApi = await screen.findByTestId(SEARCHTOAPI);

    await act(() => {
      userEvent.click(nameRadio);
      userEvent.click(searchApi);
    });

    expect(history.location.pathname).toBe('/drinks/15997');
  });
});
