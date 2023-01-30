import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import drinks from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';

describe('Testes do componente Footer', () => {
  const userEmail = 'user@email.com';
  const userPassword = 'supersecurepassword';

  test('se os ícones são carregados corretamente na tela e se direcionam para o caminho carreto', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinkCategories)
          .mockReturnValueOnce(meals)
          .mockReturnValueOnce(mealCategories)
          .mockReturnValueOnce(drinks),
      });
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    expect(history.location.pathname).toBe('/meals');

    const drinksIcon = screen.getByRole('img', { name: /todrink/i });

    await act(() => {
      userEvent.click(drinksIcon);
    });
    expect(history.location.pathname).toBe('/drinks');

    const mealsIcon = screen.getByRole('img', { name: /tomeal/i });

    await act(() => {
      userEvent.click(mealsIcon);
    });
    expect(history.location.pathname).toBe('/meals');
  });
});
