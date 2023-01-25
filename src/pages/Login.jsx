import { useContext } from 'react';
import LoginContext from '../context/LoginContext';

function Login() {
  const {
    emailInput, passwordInput, isButtonDisabled, handleClick,
  } = useContext(LoginContext);

  return (
    <div>
      <input
        data-testid="email-input"
        type="text"
        placeholder="Email"
        value={ emailInput.value }
        onChange={ emailInput.handleChange }
      />

      <input
        data-testid="password-input"
        type="password"
        placeholder="Password"
        value={ passwordInput.value }
        onChange={ passwordInput.handleChange }
      />

      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ isButtonDisabled() }
        onClick={ handleClick }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
