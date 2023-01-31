import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';
import oneDrink from '../../cypress/mocks/oneDrink';

describe('Teste MealsInProgress', () => {
  const MEALSPATH = '/drinks/178319/in-progress';
  const SHAREBTNID = 'share-btn';
  const FAVBTNIMG = 'favorite-btn';
  const PHOTOID = 'recipe-photo';
  const NAMEID = 'recipe-title';
  const INGREDIENTID0 = '0-ingredient-step';
  const INGREDIENTID1 = '1-ingredient-step';
  const INGREDIENTID2 = '2-ingredient-step';
  const INSTRUCTIONID = 'instructions';
  const FINISHBTNID = 'finish-recipe-btn';
  const VIDEOID = 'video';

  test('Verifica se os itens são renderizados na tela', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneDrink),
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
    const instructions = await screen.findByTestId(INSTRUCTIONID);
    const finishBtn = await screen.findByTestId(FINISHBTNID);
    await screen.findByTestId(VIDEOID);

    expect(shareBtn).toBeEnabled();
    expect(favoriteBtn.src).toBe('http://localhost/whiteHeartIcon.svg');
    expect(photo.src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(name).toHaveTextContent('Aquamarine');
    expect(ingredient0).toHaveTextContent('Hpnotiq 2 oz');
    expect(ingredient1).toHaveTextContent('Pineapple Juice 1 oz');
    expect(ingredient2).toHaveTextContent('Banana Liqueur 1 oz');
    expect(instructions).toHaveTextContent('Shake well in a shaker with ice. Strain in a martini glass.');
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
        json: jest.fn().mockResolvedValue(oneDrink),
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
        json: jest.fn().mockResolvedValue(oneDrink),
      });
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push(MEALSPATH));
    expect(history.location.pathname).toBe(MEALSPATH);

    const ingredient0 = await screen.findByTestId(INGREDIENTID0);
    const ingredient1 = await screen.findByTestId(INGREDIENTID1);
    const ingredient2 = await screen.findByTestId(INGREDIENTID2);
    const finishBtn = await screen.findByTestId(FINISHBTNID);

    expect(ingredient0).not.toHaveClass();

    act(() => {
      userEvent.click(ingredient0);
      userEvent.click(ingredient1);
      userEvent.click(ingredient2);
    });

    const ingredient3Checked = await screen.findByRole('checkbox', { name: /pineapple Juice 1 oz/i });
    expect(ingredient3Checked).toBeChecked();
    expect(ingredient0).toHaveClass('line-through');
    expect(finishBtn).toBeEnabled();

    act(() => {
      userEvent.click(finishBtn);
    });

    expect(history.location.pathname).toBe('/done-recipes');
  });
});
