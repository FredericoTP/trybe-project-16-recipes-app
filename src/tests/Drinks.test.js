import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import drinks from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';

describe('Teste da rota "/drinks"', () => {
  const CARDNAME0 = '0-card-name';
  const CARDIMAGE0 = '0-card-img';
  const IMAGEONE = 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg';
  const COCKTAILFILTER = 'Cocktail-category-filter';

  test('Verifica se os itens são renderizados na tela', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinkCategories)
          .mockReturnValueOnce(drinks),
      });
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));
    expect(history.location.pathname).toBe('/drinks');

    const pageTitle = await screen.findByTestId('page-title');
    expect(pageTitle).toHaveTextContent('Drinks');

    const nameOne = await screen.findByTestId(CARDNAME0);
    const imageOne = await screen.findByTestId(CARDIMAGE0);
    expect(nameOne).toHaveTextContent('GG');
    expect(imageOne.src).toContain(IMAGEONE);

    const allCategory = await screen.findByTestId('All-category-filter');
    const ordinaryCategory = await screen.findByTestId('Ordinary Drink-category-filter');
    const cocktailCategory = await screen.findByTestId(COCKTAILFILTER);
    const shakeCategory = await screen.findByTestId('Shake-category-filter');
    const otherCategory = await screen.findByTestId('Other/Unknown-category-filter');
    const cocoaCategory = await screen.findByTestId('Cocoa-category-filter');
    expect(allCategory).toBeInTheDocument();
    expect(ordinaryCategory).toBeInTheDocument();
    expect(cocktailCategory).toBeInTheDocument();
    expect(shakeCategory).toBeInTheDocument();
    expect(otherCategory).toBeInTheDocument();
    expect(cocoaCategory).toBeInTheDocument();
  });

  test('Verifica o filtro pela categoria "Cocktail"', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockReturnValue(cocktailDrinks)
          .mockReturnValueOnce(drinks)
          .mockReturnValueOnce(drinkCategories),
      });
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));
    expect(history.location.pathname).toBe('/drinks');

    const cocktailCategory = await screen.findByTestId(COCKTAILFILTER);

    await act(() => {
      userEvent.click(cocktailCategory);
    });

    const nameOne = await screen.findByTestId(CARDNAME0);
    const imageOne = await screen.findByTestId(CARDIMAGE0);
    expect(nameOne).toHaveTextContent('\'57 Chevy with a White License Plate');
    expect(imageOne.src).toContain('https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg');

    await act(() => {
      userEvent.click(cocktailCategory);
    });

    const name = await screen.findByTestId(CARDNAME0);
    const image = await screen.findByTestId(CARDIMAGE0);
    expect(name).toHaveTextContent('GG');
    expect(image.src).toContain(IMAGEONE);
  });

  test('Verifica o filtro pela categoria "All"', async () => {
    act(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockReturnValue(cocktailDrinks)
          .mockReturnValueOnce(drinks)
          .mockReturnValueOnce(drinkCategories),
      });
    });

    const { history } = renderWithRouter(<App />);
    act(() => history.push('/drinks'));
    expect(history.location.pathname).toBe('/drinks');

    const cocktailCategory = await screen.findByTestId(COCKTAILFILTER);

    await act(() => {
      userEvent.click(cocktailCategory);
    });

    const nameOne = await screen.findByTestId(CARDNAME0);
    const imageOne = await screen.findByTestId(CARDIMAGE0);
    expect(nameOne).toHaveTextContent('\'57 Chevy with a White License Plate');
    expect(imageOne.src).toContain('https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg');

    const allCategory = await screen.findByTestId('All-category-filter');

    await act(() => {
      userEvent.click(allCategory);
    });

    const name = await screen.findByTestId(CARDNAME0);
    const image = await screen.findByTestId(CARDIMAGE0);
    expect(name).toHaveTextContent('GG');
    expect(image.src).toContain(IMAGEONE);
  });
});
