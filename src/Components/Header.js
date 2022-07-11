import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../Css/Header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.classGetUser = this.classGetUser.bind(this);

    this.state = {
      isLoading: true,
      name: '',
    };
  }

  componentDidMount() {
    this.classGetUser();
  }

  async classGetUser() {
    const userData = await getUser();
    this.setState({
      isLoading: false,
      name: userData.name,
    });
  }

  render() {
    const { isLoading, name } = this.state;
    return (
      <div className="header" data-testid="header-component">
        <div className="header-user">
          <h1>Header</h1>
          { isLoading
            ? <Loading />
            : (
              <h2 data-testid="header-user-name">
                Olá,
                { name }
              </h2>)}
        </div>
        <div className="links">
          <Link
            className="header-link"
            data-testid="link-to-search"
            to="/search"
          >
            Search
          </Link>
          <Link
            className="header-link"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favorites

          </Link>
          <Link
            className="header-link"
            data-testid="link-to-profile"
            to="/profile"
          >
            Profile

          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
