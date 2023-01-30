import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import beefMeals from '../../cypress/mocks/beefMeals';

describe('Teste da rota "/meals"', () => {
  test('Verifica se os itens são renderizados na tela', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mealCategories)
          .mockReturnValueOnce(meals),
      });
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    expect(history.location.pathname).toBe('/meals');

    const titlePage = await screen.findByTestId('page-title');
    expect(titlePage).toHaveTextContent('Meals');

    const nameOne = await screen.findByTestId('0-card-name');
    const firstImage = await screen.findByTestId('0-card-img');
    expect(nameOne).toHaveTextContent('Corba');
    expect(firstImage.src).toContain('https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');

    const names = await screen.findAllByRole('heading', { level: 2 });
    const links = await screen.findAllByRole('link');
    expect(names).toHaveLength(12);
    expect(links).toHaveLength(15);

    const allCategory = await screen.findByTestId('All-category-filter');
    const beefCategory = await screen.findByTestId('Beef-category-filter');
    const breakfastCategory = await screen.findByTestId('Breakfast-category-filter');
    const chickenCategory = await screen.findByTestId('Chicken-category-filter');
    const dessertCategory = await screen.findByTestId('Dessert-category-filter');
    const goatCategory = await screen.findByTestId('Goat-category-filter');
    expect(allCategory).toBeInTheDocument();
    expect(beefCategory).toBeInTheDocument();
    expect(breakfastCategory).toBeInTheDocument();
    expect(chickenCategory).toBeInTheDocument();
    expect(dessertCategory).toBeInTheDocument();
    expect(goatCategory).toBeInTheDocument();
  });

  test('Verifica o filtro pela categoria "Beef"', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(beefMeals)
          .mockReturnValueOnce(meals)
          .mockReturnValueOnce(mealCategories),
      });
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals'));
    expect(history.location.pathname).toBe('/meals');

    const btnBeef = await screen.findByTestId('Beef-category-filter');

    await act(() => {
      userEvent.click(btnBeef);
    });

    const firstName = await screen.findByTestId('0-card-name');
    const firstImage = await screen.findByTestId('0-card-img');
    expect(firstName).toHaveTextContent('Beef and Mustard Pie');
    expect(firstImage.src).toContain('https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg');
  });
});
