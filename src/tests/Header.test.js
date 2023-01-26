import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

describe('teste componente header', () => {
  const userEmail = 'user@email.com';
  const userPassword = 'supersecurepassword';

  test('se os elementos estão na tela', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const buttonEnter = screen.getByRole('button', {
      name: /enter/i,
    });

    userEvent.type(emailInput, userEmail);
    userEvent.type(passwordInput, userPassword);
    userEvent.click(buttonEnter);

    const btnProfile = screen.getByTestId('profile-top-btn');
    const btnSearch = screen.getByTestId('search-top-btn');
    const title = screen.getByTestId('page-title');

    expect(history.location.pathname).toBe('/meals');
    expect(btnProfile).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/meals/i);

    userEvent.click(btnSearch);
    const searchInput = screen.getByTestId('search-input');

    expect(searchInput).toBeInTheDocument();

    userEvent.click(btnSearch);
    expect(searchInput).not.toBeInTheDocument();
  });
});
