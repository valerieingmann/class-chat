import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const SignUpLink = () => (
  <div className="landing-box">
    <p>Don't have an account? </p>

    <Link className="link-small" to={ROUTES.SIGN_UP_TEACHER}>
      Create a Teacher Acccount
    </Link>
    <Link className="link-small" to={ROUTES.SIGN_UP_STUDENT}>
      Create a Student Acccount
    </Link>
  </div>
);

export { SignUpLink };
