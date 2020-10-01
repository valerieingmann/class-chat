import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { AuthUserContext } from '../Session';
import { withAuthorization, withEmailVerification } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

class AdminPage extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
    };
  }

  onChange = event => {
    this.setState({ title: event.target.value });
  };
  createChat = (event, authUser) => {
    console.log(authUser);
    this.props.firebase
      .chats()
      .push({ title: this.state.title, ownerId: authUser.uid });
  };

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <h1>Admin</h1>
            <p>
              The Admin Page is accessible by every signed in admin
              user.
            </p>
            {/* <button
              onClick={event => this.createChat(event, authUser)}
            >
              Create Chat
            </button> */}
            <form
              onSubmit={event => this.createChat(event, authUser)}
            >
              <input
                type="text"
                value={this.state.title}
                onChange={this.onChange}
              />
              <button type="submit">Create New Chat Room</button>
            </form>

            <Switch>
              <Route
                exact
                path={ROUTES.ADMIN_DETAILS}
                component={UserItem}
              />
              <Route exact path={ROUTES.ADMIN} component={UserList} />
            </Switch>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase,
)(AdminPage);
