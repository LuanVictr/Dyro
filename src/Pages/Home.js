import React from 'react';
import Loading from '../Components/Loading';
import '../Css/Home.css'
import { createUser } from '../services/userAPI';

class Home extends React.Component {
  constructor() {
      super();

      this.HandleChange = this.HandleChange.bind(this);
      this.EnableButton = this.EnableButton.bind(this);
      this.ClassCreateUser = this.ClassCreateUser.bind(this);

      this.state = {
          username: "",
          isDisabled: true,
          isLoading: false,
      }
  }

  async ClassCreateUser() {
      const { username } = this.state;
      const { history } = this.props;
      this.setState({
        isLoading: true,
      });
      await createUser({ name: username });
      history.push('/search')
  }

  HandleChange({target}) {
    const {name, value} = target;
    this.setState({
      [name]:value
    },() => {this.EnableButton()});
  }

  EnableButton() {
      const { username } = this.state
      if (username.length >= 3) {
          this.setState({
              isDisabled: false,
          })
      } else {
          this.setState({
              isDisabled: true,
          })
      }
  }

  render() {
      const { isDisabled, username, isLoading } = this.state
    return (
      <div>
        {isLoading ? <Loading />
        : <fieldset className="login-fieldset" data-testid="page-login">
          <form className="login-form">
          <label htmlFor="name-input">
            Login
              <input
                onChange={this.HandleChange}
                value={username}
                data-testid="login-name-input"
                type="text"
                id="name-input"
                placeholder="Digite seu nome"
                name="username"
              />
              <button disabled={isDisabled} onClick={this.ClassCreateUser} data-testid="login-submit-button" type="button">Entrar</button>
            </label>
            </form>
        </fieldset>
        }
      </div>
    );
  }
}

export default Home;
