import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';
import drinks from './mocks/drinks';
import oneMeal from './mocks/oneMeal';

describe('Teste da rota "/meals-details"', () => {
  const PATHNAME = '/meals/52771';

  test('Verifica se os elementos são renderizados corretamente', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinks)
          .mockReturnValueOnce(oneMeal),
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
    const ingredient4 = await screen.findByTestId('3-ingredient-name-and-measure');
    const ingredient5 = await screen.findByTestId('4-ingredient-name-and-measure');
    const ingredient6 = await screen.findByTestId('5-ingredient-name-and-measure');
    const ingredient7 = await screen.findByTestId('6-ingredient-name-and-measure');
    const ingredient8 = await screen.findByTestId('7-ingredient-name-and-measure');
    const instruction = await screen.findByTestId('instructions');
    const video = await screen.findByTestId('video');
    const btnStart = await screen.findByTestId('start-recipe-btn');
    const btnShare = await screen.findByTestId('share-btn');
    const btnFavorite = await screen.findByTestId('favorite-btn');

    expect(recipePhoto.src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(recipeTitle).toHaveTextContent('Spicy Arrabiata Penne');
    expect(recipeCategory).toHaveTextContent('Vegetarian');
    expect(ingredient1).toHaveTextContent('penne rigate 1 pound');
    expect(ingredient2).toHaveTextContent('olive oil 1/4 cup');
    expect(ingredient3).toHaveTextContent('garlic 3 cloves');
    expect(ingredient4).toHaveTextContent('chopped tomatoes 1 tin');
    expect(ingredient5).toHaveTextContent('red chile flakes 1/2 teaspoon');
    expect(ingredient6).toHaveTextContent('italian seasoning 1/2 teaspoon');
    expect(ingredient7).toHaveTextContent('basil 6 leaves');
    expect(ingredient8).toHaveTextContent('Parmigiano-Reggiano spinkling');
    expect(instruction).toHaveTextContent('Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes. In a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil. Drain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.');
    expect(video.src).toBe('https://www.youtube.com/watch?v=1IszT_guI08');
    expect(btnStart).toHaveTextContent('Start Recipe');
    expect(btnShare).toBeInTheDocument();
    expect(btnFavorite.src).toBe('http://localhost/whiteHeartIcon.svg');
  });

  test('verfica a funcionalidade do botão favorite', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinks)
          .mockReturnValueOnce(oneMeal),
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
        meals: {
          52771: ['bla'],
        },
      },
    ));

    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinks)
          .mockReturnValueOnce(oneMeal),
      });
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push(PATHNAME));
    expect(history.location.pathname).toBe(PATHNAME);

    const continueRecipe = await screen.findByTestId('start-recipe-btn');
    expect(continueRecipe).toHaveTextContent('Continue Recipe');
  });

  test('Verifica se a receita foi finalizada', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(
      [{
        id: '52771',
      }],
    ));

    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinks)
          .mockReturnValueOnce(oneMeal),
      });
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push(PATHNAME));
    expect(history.location.pathname).toBe(PATHNAME);

    const finishedRecipe = await screen.findByTestId('recipe-finished');
    expect(finishedRecipe).toHaveTextContent('Recipe Finished');
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
        json: jest.fn().mockResolvedValue(drinks)
          .mockReturnValueOnce(oneMeal),
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
