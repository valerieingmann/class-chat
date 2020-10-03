import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import TeacherSignUp from './TeacherSignUp';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <TeacherSignUp />
  </div>
);

const SignUpLink = () => (
  <p>
    Don't have an account?{' '}
    <Link to={ROUTES.SIGN_UP_TEACHER}>Create a Teacher Acccount</Link>
    <Link to={ROUTES.SIGN_UP_STUDENT}>Create a Student Acccount</Link>
  </p>
);

export default SignUpPage;

export { SignUpLink };
