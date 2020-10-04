import React, { Component } from 'react';

import { compose } from 'recompose';
import { AuthUserContext } from '../Session';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase';
import ViewStudents from './ViewStudents';
import AddStudent from './AddStudent';

class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
    };
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="box">
            <h1>Manage Students</h1>
            <AddStudent authUser={authUser} />
            <ViewStudents
              authUser={authUser}
              firebase={this.props.firebase}
            />
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withAuthorization(condition),
  withFirebase,
)(AdminPage);
