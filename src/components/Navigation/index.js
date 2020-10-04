import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        {authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )}
      </div>
    )}
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <nav className="navbar">
    <Link className="link" id="logo" to={ROUTES.HOME}>
      CLASSCHAT
    </Link>
    <ul className="nav-links">
      <li className="home">
        <Link className="link" to={ROUTES.HOME}>
          Home
        </Link>
      </li>
      <li>
        <Link className="link" to={ROUTES.ACCOUNT}>
          Account
        </Link>
      </li>
      {!!authUser.roles[ROLES.ADMIN] && (
        <li>
          <Link className="link" to={ROUTES.ADMIN}>
            Manage Students
          </Link>
        </li>
      )}
      <li>
        <SignOutButton />
      </li>
    </ul>
  </nav>
);

const NavigationNonAuth = () => (
  <nav className="navbar">
    <Link className="link" id="logo" to={ROUTES.LANDING}>
      CLASSCHAT
    </Link>
    <ul className="nav-links">
      <li>
        <Link className="link" to={ROUTES.SIGN_IN}>
          Sign In
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
