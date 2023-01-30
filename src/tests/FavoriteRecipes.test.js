import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';
import favoriteList from './helpers/favoriteList';

describe('Testa a rota "/favorite-recipes', () => {
  const FILTERALL = 'filter-by-all-btn';
  const FILTERMEAL = 'filter-by-meal-btn';
  const FILTERDRINK = 'filter-by-drink-btn';
  const IDIMAGE1 = '0-horizontal-image';
  const IDNAME1 = '0-horizontal-name';
  const IDTEXT1 = '0-horizontal-top-text';
  const IDBTNFAV1 = '0-horizontal-favorite-btn';
  const IDBTNSHARE1 = '0-horizontal-share-btn';
  const IDIMAGE2 = '1-horizontal-image';
  const IDNAME2 = '1-horizontal-name';
  const IDTEXT2 = '1-horizontal-top-text';
  const IDBTNFAV2 = '1-horizontal-favorite-btn';
  const IDBTNSHARE2 = '1-horizontal-share-btn';

  test('Verifica se os elementos são renderizados na tela', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteList));

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

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/favorite-recipes'));

    const btnAll = screen.getByTestId(FILTERALL);
    const btnMeals = screen.getByTestId(FILTERMEAL);
    const btnDrinks = screen.getByTestId(FILTERDRINK);
    const image1 = screen.getByTestId(IDIMAGE1);
    const name1 = screen.getByTestId(IDNAME1);
    const text1 = screen.getByTestId(IDTEXT1);
    const btnFavorite1 = screen.getByTestId(IDBTNFAV1);
    const btnShare1 = screen.getByTestId(IDBTNSHARE1);
    const image2 = screen.getByTestId(IDIMAGE2);
    const name2 = screen.getByTestId(IDNAME2);
    const text2 = screen.getByTestId(IDTEXT2);
    const btnFavorite2 = screen.getByTestId(IDBTNFAV2);
    const btnShare2 = screen.getByTestId(IDBTNSHARE2);

    act(() => {
      userEvent.click(btnShare1);
      userEvent.click(btnShare2);
    });

    expect(btnAll).toHaveTextContent('All');
    expect(btnMeals).toHaveTextContent('Meals');
    expect(btnDrinks).toHaveTextContent('Drinks');
    expect(name1).toHaveTextContent('Spicy Arrabiata Penne');
    expect(text1).toHaveTextContent('- Vegetarian');
    expect(name2).toHaveTextContent('Aquamarine');
    expect(text2).toHaveTextContent('Alcoholic');
    expect(image1.src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(btnFavorite1.src).toBe('http://localhost/blackHeartIcon.svg');
    expect(btnShare1.src).toBe('http://localhost/shareIcon.svg');
    expect(image2.src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(btnFavorite2.src).toBe('http://localhost/blackHeartIcon.svg');
    expect(btnShare2.src).toBe('http://localhost/shareIcon.svg');

    act(() => {
      userEvent.click(btnMeals);
    });

    screen.getByTestId(IDNAME1);
    screen.getByTestId(IDBTNFAV1);
    screen.getByTestId(IDBTNSHARE1);
    expect(screen.getByTestId(IDNAME1)).toHaveTextContent('Spicy Arrabiata Penne');
    expect(screen.getByTestId(IDTEXT1)).toHaveTextContent('- Vegetarian');
    expect(screen.getByTestId(IDIMAGE1).src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');

    act(() => {
      userEvent.click(btnDrinks);
    });

    expect(screen.getByTestId(IDNAME1)).toHaveTextContent('Aquamarine');
    expect(screen.getByTestId(IDTEXT1)).toHaveTextContent('Alcoholic');
    expect(screen.getByTestId(IDIMAGE1).src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    screen.getByTestId(IDBTNFAV1);
    screen.getByTestId(IDBTNSHARE1);

    act(() => {
      userEvent.click(btnAll);
    });

    screen.getByTestId(IDIMAGE1);
    screen.getByTestId(IDNAME1);
    screen.getByTestId(IDTEXT1);
    screen.getByTestId(IDBTNFAV1);
    screen.getByTestId(IDBTNSHARE1);
    screen.getByTestId(IDIMAGE2);
    screen.getByTestId(IDNAME2);
    const textTwo = screen.getByTestId(IDTEXT2);
    const btnFav2 = screen.getByTestId(IDBTNFAV2);
    screen.getByTestId(IDBTNSHARE2);

    act(() => {
      userEvent.click(btnFav2);
    });

    expect(textTwo).not.toBeInTheDocument();
    const btnFav1 = screen.getByTestId(IDBTNFAV1);
    const textOne = screen.getByTestId(IDTEXT1);

    act(() => {
      userEvent.click(btnFav1);
    });

    expect(textOne).not.toBeInTheDocument();
  });
});
