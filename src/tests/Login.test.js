import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da página de Login', () => {
  const userEmail = 'user@email.com';
  const userPassword = 'supersecurepassword';

  test('se os componentes são carregados corretamente na tela e o botão está desabilitado', () => {
    renderWithRouter(<App />);
    screen.getByRole('textbox');
    screen.getByPlaceholderText(/password/i);
    const buttonEnter = screen.getByRole('button', {
      name: /enter/i,
    });
    expect(buttonEnter).toBeDisabled();
  });

  test('se é possível digitar nos inputs, se o botão é habilitado e o usuário é direcionado para tela principal', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    userEvent.type(emailInput, userEmail);
    expect(emailInput).toHaveValue(userEmail);
    userEvent.type(passwordInput, userPassword);
    expect(passwordInput).toHaveValue(userPassword);
    const buttonEnter = screen.getByRole('button', {
      name: /enter/i,
    });
    expect(buttonEnter).toBeEnabled();

    userEvent.click(buttonEnter);
    expect(history.location.pathname).toBe('/meals');
  });
});
