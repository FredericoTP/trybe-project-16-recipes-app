import { useContext } from 'react';
import LoginContext from '../context/LoginContext';
import '../style/Login.css';
import imageLogo from '../images/recipes-app-logo.png';

function Login() {
  const {
    emailInput, passwordInput, isButtonDisabled, handleClick,
  } = useContext(LoginContext);

  const NUMBER7 = 7;

  return (
    <div className="login-container">
      <div className="login-form-container">
        <img className="login-image-logo" src={ imageLogo } alt="logo" />
        <div className="login-form">
          <h2 className="login-title">Login</h2>
          <input
            className="form-control login-input"
            data-testid="email-input"
            type="email"
            placeholder="Email"
            value={ emailInput.value }
            onChange={ emailInput.handleChange }
          />
          <input
            className="form-control login-input"
            data-testid="password-input"
            type="password"
            placeholder="Password"
            value={ passwordInput.value }
            onChange={ passwordInput.handleChange }
          />
          {
            (passwordInput.value.length > 0 && passwordInput.value.length < NUMBER7) && (
              <small
                className="login-warning"
              >
                Password must be at least 7 characters
              </small>
            )
          }

          <button
            className="btn btn-light login-btn"
            data-testid="login-submit-btn"
            type="button"
            disabled={ isButtonDisabled() }
            onClick={ handleClick }
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
