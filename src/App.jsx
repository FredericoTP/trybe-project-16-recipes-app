import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import LoginProvider from './context/LoginProvider';
import Meals from './pages/Meals';

function App() {
  return (
    <LoginProvider>
      <Switch>
        <Route exact path="/meals" component={ Meals } />
        <Route exatc path="/" component={ Login } />
      </Switch>
    </LoginProvider>
  );
}

export default App;
