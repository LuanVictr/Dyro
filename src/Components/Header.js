import React, { useContext } from 'react';
import '../Css/Header.css';
import { useHistory } from 'react-router-dom';
import LogoIcon from '../Css/images/logo-icon.png';
import MyContext from '../context/context';
import LogoProfile from '../Css/images/logo-perfil.png';
import LogoLogOut from '../Css/images/logo-logout.png';

function Header() {
  const history = useHistory();
  const { userName } = useContext(MyContext);

  return (
    <div className="Header">
      <img className="logo-icon" src={ LogoIcon } alt="Logo Dyro" />
      <h4>{`Olá ${userName}`}</h4>
      <div className="header-nav">
        <img className="profile-icon" src={ LogoProfile } alt="Profile Logo" />
        <img
          aria-hidden
          onClick={ () => history.push('/') }
          className="logout-icon"
          src={ LogoLogOut }
          alt="Profile Logout"
        />
      </div>
    </div>

  );
}

export default Header;
