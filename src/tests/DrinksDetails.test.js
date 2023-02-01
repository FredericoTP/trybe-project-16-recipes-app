import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';
import meals from './mocks/meals';
import oneDrinkId15997 from './mocks/oneDrinkId15997';

describe('Teste da rota "/meals-details"', () => {
  const PATHNAME = '/drinks/15997';

  test('Verifica se os elementos são renderizados corretamente', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(meals)
          .mockReturnValueOnce(oneDrinkId15997),
      });
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push(PATHNAME));
    expect(history.location.pathname).toBe(PATHNAME);

    const recipePhoto = await screen.findByTestId('recipe-photo');
    const recipeTitle = await screen.findByTestId('recipe-title');
    const recipeCategory = await screen.findByTestId('recipe-category');
    const ingredient1 = await screen.findByTestId('0-ingredient-name-and-measure');
    const ingredient2 = await screen.findByTestId('1-ingredient-name-and-measure');
    const ingredient3 = await screen.findByTestId('2-ingredient-name-and-measure');
    const instruction = await screen.findByTestId('instructions');
    const video = await screen.findByTestId('video');
    const btnStart = await screen.findByTestId('start-recipe-btn');
    const btnShare = await screen.findByTestId('share-btn');
    const btnFavorite = await screen.findByTestId('favorite-btn');

    expect(recipePhoto.src).toBe('https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
    expect(recipeTitle).toHaveTextContent('GG');
    expect(recipeCategory).toHaveTextContent('Optional alcohol');
    expect(ingredient1).toHaveTextContent('Galliano 2 1/2 shots');
    expect(ingredient2).toHaveTextContent('Ginger ale');
    expect(ingredient3).toHaveTextContent('Ice');
    expect(instruction).toHaveTextContent('Pour the Galliano liqueur over ice. Fill the remainder of the glass with ginger ale and thats all there is to it. You now have a your very own GG.');
    expect(video.src).toBe('');
    expect(btnStart).toHaveTextContent('Start Recipe');
    expect(btnShare).toBeInTheDocument();
    expect(btnFavorite.src).toBe('http://localhost/whiteHeartIcon.svg');
  });

  test('verfica a funcionalidade do botão favorite', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(meals)
          .mockReturnValueOnce(oneDrinkId15997),
      });
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push(PATHNAME));
    expect(history.location.pathname).toBe(PATHNAME);

    const btnFavorite = await screen.findByTestId('favorite-btn');

    act(() => {
      userEvent.click(btnFavorite);
    });

    expect(btnFavorite.src).toBe('http://localhost/blackHeartIcon.svg');

    act(() => {
      userEvent.click(btnFavorite);
    });

    expect(btnFavorite.src).toBe('http://localhost/whiteHeartIcon.svg');
  });

  test('Verifica botão Continue Recipe', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      {
        drinks: {
          15997: ['bla'],
        },
      },
    ));

    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(meals)
          .mockReturnValueOnce(oneDrinkId15997),
      });
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push(PATHNAME));
    expect(history.location.pathname).toBe(PATHNAME);

    const continueRecipe = await screen.findByTestId('start-recipe-btn');
    expect(continueRecipe).toHaveTextContent('Continue Recipe');
  });

  test('verifica link de copiar', async () => {
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

    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(meals)
          .mockReturnValueOnce(oneDrinkId15997),
      });
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push(PATHNAME));
    expect(history.location.pathname).toBe(PATHNAME);

    const btnShare = await screen.findByTestId('share-btn');

    act(() => {
      userEvent.click(btnShare);
    });

    const linkShared = await screen.findByText(/link copied!/i);
    expect(linkShared).toBeInTheDocument();
  });
});
