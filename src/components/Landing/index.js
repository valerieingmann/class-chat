import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';

const Landing = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <LandingAuth authUser={authUser} />
      ) : (
        <LandingNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const LandingAuth = ({ authUser }) => {
  return (
    <div className="box">
      <Link to={ROUTES.HOME}>
        {authUser.classroomName || 'My Classroom'}
      </Link>
    </div>
  );
};

const LandingNonAuth = () => {
  return (
    <div className="box">
      <h1>Welcome to ClassroomChat!</h1>
      <p>Description of the website and how to use it.</p>
      <p>I am a...</p>
      <Link to={ROUTES.SIGN_UP_STUDENT}>STUDENT</Link>
      <Link to={ROUTES.SIGN_UP_TEACHER}>TEACHER</Link>
    </div>
  );
};

export default Landing;
