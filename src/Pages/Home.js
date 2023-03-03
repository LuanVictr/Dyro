import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import '../Css/Home.css';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/context';
import Logo from '../Css/images/logo.png';

function Home() {
  const history = useHistory();

  const {
    userName,
    setUserName,
  } = useContext(MyContext);

  const handleUserNameChange = ({ target }) => {
    setUserName(target.value);
  };

  return (
    <div className="login-page">
      <form className="login-form">
        <img className="logo-image" src={ Logo } alt="logo" />
        <input
          onChange={ handleUserNameChange }
          data-testid="login-name-input"
          type="text"
          value={ userName }
          id="name-input"
          placeholder="Nome de usuário"
          name="username"
          className="login-input"
        />
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Senha"
          className="login-input"
        />
        <button
          onClick={ () => history.push('/search') }
          data-testid="login-submit-button"
          type="button"
          id="login-button"
        >
          Entrar

        </button>
      </form>
    </div>
  );
}

export default Home;

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
