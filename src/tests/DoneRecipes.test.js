import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';
import doneList from './helpers/doneList';

describe('Teste rota "/done-recipes"', () => {
  const IMAGE0 = '0-horizontal-image';
  const NAME0 = '0-horizontal-name';
  const TOPTEXT0 = '0-horizontal-top-text';
  const DONEDATE0 = '0-horizontal-done-date';
  const TAG01 = '0-Veg-horizontal-tag';
  const TAG02 = '0-Pepper-horizontal-tag';
  const SHAREBTN0 = '0-horizontal-share-btn';
  const IMAGE1 = '1-horizontal-image';
  const NAME1 = '1-horizontal-name';
  const TOPTEXT1 = '1-horizontal-top-text';
  const DONEDATE1 = '1-horizontal-done-date';
  const SHAREBTN1 = '1-horizontal-share-btn';

  test('verifica se os elemento são renderizados na tela', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneList));

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/done-recipes'));

    const imageMeal = screen.getByTestId(IMAGE0);
    const nameMeal = screen.getByTestId(NAME0);
    const topTextMeal = screen.getByTestId(TOPTEXT0);
    const doneDateMeal = screen.getByTestId(DONEDATE0);
    const tag1Meal = screen.getByTestId(TAG01);
    const tag2Meal = screen.getByTestId(TAG02);
    const shareMeal = screen.getByTestId(SHAREBTN0);
    const imageDrink = screen.getByTestId(IMAGE1);
    const nameDrink = screen.getByTestId(NAME1);
    const topTextDrink = screen.getByTestId(TOPTEXT1);
    const doneDateDrink = screen.getByTestId(DONEDATE1);
    screen.getByTestId(SHAREBTN1);

    expect(imageMeal.src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(nameMeal).toHaveTextContent('Spicy Arrabiata Penne');
    expect(topTextMeal).toHaveTextContent('Germany - Vegetarian');
    expect(doneDateMeal).toHaveTextContent('31/01/2023');
    expect(tag1Meal).toHaveTextContent('Veg');
    expect(tag2Meal).toHaveTextContent('Pepper');
    expect(shareMeal.src).toBe('http://localhost/shareIcon.svg');
    expect(imageDrink.src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(nameDrink).toHaveTextContent('Aquamarine');
    expect(topTextDrink).toHaveTextContent('Alcoholic');
    expect(doneDateDrink).toHaveTextContent('30/01/2023');
  });

  test('Verifica botão share', () => {
    let clipboardData = '';
    const mockClipboard = {
      writeText: jest.fn(
        (data) => { clipboardData = data; },
      ),
      readText: jest.fn(
        () => clipboardData,
      ),
    };
    global.navigator.clipboard = mockClipboard;

    localStorage.setItem('doneRecipes', JSON.stringify(doneList));

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/done-recipes'));

    const btns = screen.getAllByTestId('btn-share-done');

    act(() => {
      userEvent.click(btns[0]);
      userEvent.click(btns[1]);
    });

    screen.getAllByText(/link copied!/i);
  });
});
