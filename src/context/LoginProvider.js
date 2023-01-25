import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import LoginContext from './LoginContext';
import useInput from '../hook/useInput';
import useLocalStorage from '../hook/useLocalStorage';

function LoginProvider({ children }) {
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const [storage, setStorage] = useLocalStorage('user', {});
  const history = useHistory();

  function isButtonDisabled() {
    const NUMBER6 = 6;
    const validatePassword = passwordInput.value.length > NUMBER6;
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return !(validatePassword && validEmail.test(emailInput.value));
  }

  function handleClick() {
    setStorage({ email: emailInput.value });
    history.push('/meals');
  }

  const valueLogin = useMemo(() => ({
    emailInput,
    passwordInput,
    isButtonDisabled,
    handleClick,
    storage,
  }), [emailInput, passwordInput, storage]);

  return (
    <LoginContext.Provider value={ valueLogin }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default LoginProvider;
