import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <span className="link" onClick={firebase.doSignOut}>
    Sign Out
  </span>
);

export default withFirebase(SignOutButton);
