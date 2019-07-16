import React from 'react';

import Login from '../Login';
import Logout from '../Logout';
import { Creds } from '../../types';
import { loginUser, logoutUser } from '../../actions'

interface NavbarProps {
  dispatch: any;
  isAuthenticated: boolean;
  errorMessage?: string;
}

const Navbar: React.FC<NavbarProps> = ({ dispatch, isAuthenticated, errorMessage }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <a className="navbar-brand" href="/">Recipes App</a>

      {!isAuthenticated &&
        <Login
          errorMessage={errorMessage}
          onLoginClick={(creds: Creds) => dispatch(loginUser(creds))}
        />
      }

      {isAuthenticated &&
        <Logout onLogoutClick={() => dispatch(logoutUser())} />
      }
    </div>
  </nav>
)

export default Navbar;
