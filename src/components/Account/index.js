import React, { Component } from 'react';

import { compose } from 'recompose';

import { AuthUserContext, withAuthorization } from '../Session';

import { withFirebase } from '../Firebase';

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <h1>My Profile</h1>

            <div>
              <p>Username: {authUser.username}</p>
              <p>Email: {authUser.email}</p>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withFirebase,
)(AccountPage);
