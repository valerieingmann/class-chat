import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const SignUpLink = () => (
  <p>
    Don't have an account?{' '}
    <Link to={ROUTES.SIGN_UP_TEACHER}>Create a Teacher Acccount</Link>
    <Link to={ROUTES.SIGN_UP_STUDENT}>Create a Student Acccount</Link>
  </p>
);

export { SignUpLink };
