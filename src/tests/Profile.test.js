import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

describe('Testa rota "/profile"', () => {
  test('Verifica se é renderizado corretamente e o clique dos botões', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/profile'));
    expect(history.location.pathname).toBe('/profile');

    const btnDone = screen.getByTestId('profile-done-btn');
    userEvent.click(btnDone);
    expect(history.location.pathname).toBe('/done-recipes');

    act(() => history.push('/profile'));
    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnFavorite);
    expect(history.location.pathname).toBe('/favorite-recipes');

    act(() => history.push('/profile'));
    const btnLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(btnLogout);
    expect(history.location.pathname).toBe('/');
  });
});
