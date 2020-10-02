import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { AuthUserContext } from '../Session';
import { withAuthorization } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

class CreateUserBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      error: null,
      chats: [],
    };
  }

  componentDidMount() {
    this.props.firebase.chats().on('value', snapshot => {
      const chatsObject = snapshot.val();

      const chatsList = Object.keys(chatsObject).map(key => ({
        ...chatsObject[key],
        uid: key,
      }));

      this.setState({
        chats: chatsList,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.chats().off();
  }

  onSubmit = event => {
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    console.log(this.state.chats);
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={this.state.username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={this.state.password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button type="submit">Create New User</button>
      </form>
    );
  }
}

const CreateUserForm = compose(
  withRouter,
  withFirebase,
)(CreateUserBase);

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

            <CreateUserForm />

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
  withAuthorization(condition),
  withFirebase,
)(AdminPage);
