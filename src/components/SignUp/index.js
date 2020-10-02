import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import TeacherSignUp from './TeacherSignUp';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <TeacherSignUp />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

const SignUpLink = () => (
  <p>
    Don't have an account?{' '}
    <Link to={ROUTES.SIGN_UP_TEACHER}>Create a Teacher Acccount</Link>
    <Link to={ROUTES.SIGN_UP_STUDENT}>Create a Student Acccount</Link>
  </p>
);

export default SignUpPage;

export { SignUpLink };
