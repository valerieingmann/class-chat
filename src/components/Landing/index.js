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
      <div className="landing-box">
        <Link className="link-small" to={ROUTES.HOME}>
          {authUser.classroomName
            ? `Go to ${authUser.classroomName}`
            : 'Go To My Classroom'}
        </Link>
      </div>
    </div>
  );
};

const LandingNonAuth = () => {
  return (
    <div className="box">
      <div className="landing-box">
        <h1>Welcome to ClassroomChat!</h1>

        <p>I am a...</p>
        <Link className="link-small" to={ROUTES.SIGN_UP_STUDENT}>
          STUDENT
        </Link>
        <Link className="link-small" to={ROUTES.SIGN_UP_TEACHER}>
          TEACHER
        </Link>
      </div>
    </div>
  );
};

export default Landing;
