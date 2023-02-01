import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';
import oneMeal from './mocks/oneMeal';

describe('Teste MealsInProgress', () => {
  const MEALSPATH = '/meals/52771/in-progress';
  const SHAREBTNID = 'share-btn';
  const FAVBTNIMG = 'favorite-btn';
  const PHOTOID = 'recipe-photo';
  const NAMEID = 'recipe-title';
  const INGREDIENTID0 = '0-ingredient-step';
  const INGREDIENTID1 = '1-ingredient-step';
  const INGREDIENTID2 = '2-ingredient-step';
  const INGREDIENTID3 = '3-ingredient-step';
  const INGREDIENTID4 = '4-ingredient-step';
  const INGREDIENTID5 = '5-ingredient-step';
  const INGREDIENTID6 = '6-ingredient-step';
  const INGREDIENTID7 = '7-ingredient-step';
  const INSTRUCTIONID = 'instructions';
  const FINISHBTNID = 'finish-recipe-btn';
  const VIDEOID = 'video';

  test('Verifica se os itens são renderizados na tela', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneMeal),
      });
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push(MEALSPATH));
    expect(history.location.pathname).toBe(MEALSPATH);

    const shareBtn = await screen.findByTestId(SHAREBTNID);
    const favoriteBtn = await screen.findByTestId(FAVBTNIMG);
    const photo = await screen.findByTestId(PHOTOID);
    const name = await screen.findByTestId(NAMEID);
    const ingredient0 = await screen.findByTestId(INGREDIENTID0);
    const ingredient1 = await screen.findByTestId(INGREDIENTID1);
    const ingredient2 = await screen.findByTestId(INGREDIENTID2);
    const ingredient3 = await screen.findByTestId(INGREDIENTID3);
    const ingredient4 = await screen.findByTestId(INGREDIENTID4);
    const ingredient5 = await screen.findByTestId(INGREDIENTID5);
    const ingredient6 = await screen.findByTestId(INGREDIENTID6);
    const ingredient7 = await screen.findByTestId(INGREDIENTID7);
    const instructions = await screen.findByTestId(INSTRUCTIONID);
    const finishBtn = await screen.findByTestId(FINISHBTNID);
    await screen.findByTestId(VIDEOID);

    expect(shareBtn).toBeEnabled();
    expect(favoriteBtn.src).toBe('http://localhost/whiteHeartIcon.svg');
    expect(photo.src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(name).toHaveTextContent('Spicy Arrabiata Penne');
    expect(ingredient0).toHaveTextContent('penne rigate 1 pound');
    expect(ingredient1).toHaveTextContent('olive oil 1/4 cup');
    expect(ingredient2).toHaveTextContent('garlic 3 cloves');
    expect(ingredient3).toHaveTextContent('chopped tomatoes 1 tin');
    expect(ingredient4).toHaveTextContent('red chile flakes 1/2 teaspoon');
    expect(ingredient5).toHaveTextContent('italian seasoning 1/2 teaspoon');
    expect(ingredient6).toHaveTextContent('basil 6 leaves');
    expect(ingredient7).toHaveTextContent('Parmigiano-Reggiano spinkling');
    expect(instructions).toHaveTextContent('Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes. In a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil. Drain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.');
    expect(finishBtn).toHaveTextContent('Finalizar Receita');
    expect(finishBtn).toBeDisabled();
    expect(ingredient0).not.toBeChecked();
  });

  test('Verifica botão de compartilhar e favoritar', async () => {
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
        json: jest.fn().mockResolvedValue(oneMeal),
      });
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push(MEALSPATH));
    expect(history.location.pathname).toBe(MEALSPATH);

    const shareBtn = await screen.findByTestId(SHAREBTNID);
    const favoriteBtn = await screen.findByTestId(FAVBTNIMG);

    act(() => {
      userEvent.click(shareBtn);
      userEvent.click(favoriteBtn);
    });

    screen.getByText(/link copied!/i);
    expect(favoriteBtn.src).toBe('http://localhost/blackHeartIcon.svg');

    act(() => {
      userEvent.click(favoriteBtn);
    });

    expect(favoriteBtn.src).toBe('http://localhost/whiteHeartIcon.svg');
  });

  test('Verifica check dos ingredientes e botão finalizar receita', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneMeal),
      });
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push(MEALSPATH));
    expect(history.location.pathname).toBe(MEALSPATH);

    const ingredient0 = await screen.findByTestId(INGREDIENTID0);
    const ingredient1 = await screen.findByTestId(INGREDIENTID1);
    const ingredient2 = await screen.findByTestId(INGREDIENTID2);
    const ingredient3 = await screen.findByTestId(INGREDIENTID3);
    const ingredient4 = await screen.findByTestId(INGREDIENTID4);
    const ingredient5 = await screen.findByTestId(INGREDIENTID5);
    const ingredient6 = await screen.findByTestId(INGREDIENTID6);
    const ingredient7 = await screen.findByTestId(INGREDIENTID7);
    const finishBtn = await screen.findByTestId(FINISHBTNID);

    expect(ingredient0).not.toHaveClass();

    act(() => {
      userEvent.click(ingredient0);
      userEvent.click(ingredient1);
      userEvent.click(ingredient2);
      userEvent.click(ingredient3);
      userEvent.click(ingredient4);
      userEvent.click(ingredient5);
      userEvent.click(ingredient6);
      userEvent.click(ingredient7);
    });

    const ingredient3Checked = await screen.findByRole('checkbox', { name: /garlic 3 cloves/i });
    expect(ingredient3Checked).toBeChecked();
    expect(ingredient0).toHaveClass('line-through');
    expect(finishBtn).toBeEnabled();

    act(() => {
      userEvent.click(finishBtn);
    });

    expect(history.location.pathname).toBe('/done-recipes');
  });
});
