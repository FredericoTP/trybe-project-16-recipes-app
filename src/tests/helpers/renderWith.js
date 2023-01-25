import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import LoginProvider from '../../context/LoginProvider';

function withContext(component) {
  return (
    <LoginProvider>
      { component }
    </LoginProvider>
  );
}

export function renderWithContext(component) {
  return {
    ...render(withContext(component)),
  };
}

function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}

export function renderWithRouter(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}
