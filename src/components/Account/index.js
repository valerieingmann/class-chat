import React, { Component } from 'react';

import { compose } from 'recompose';

import { AuthUserContext, withAuthorization } from '../Session';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withFirebase } from '../Firebase';

class ViewStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersInRoom: [],
    };
  }

  componentDidMount() {
    const chatId = this.props.authUser.chatId;

    let usersInRoom = [];
    this.props.firebase
      .users()
      .orderByChild('chatId')
      .equalTo(chatId)
      .on('child_added', function(snapshot) {
        usersInRoom.push(snapshot.val());
      });

    this.setState({ usersInRoom });
  }

  render() {
    let myStudents = [];
    if (this.state.usersInRoom.length) {
      myStudents = this.state.usersInRoom.filter(
        user => user.email !== this.props.authUser.email,
      );
    }

    return (
      <div>
        <h3>My Students</h3>
        {myStudents.map(student => {
          return (
            <div key={student.email}>
              <p>{student.username}</p>
              <p>{student.email}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

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
            <h1>Welcome, {authUser.username}!</h1>
            {authUser.roles.ADMIN ? (
              <ViewStudents
                authUser={authUser}
                firebase={this.props.firebase}
              />
            ) : (
              <div>
                <p>
                  Give this code to your teacher to connect to their
                  room!
                </p>
                <p>{authUser.uid}</p>
                <CopyToClipboard
                  text={authUser.uid}
                  onCopy={() => this.setState({ copied: true })}
                >
                  <button>Copy to Clipboard</button>
                </CopyToClipboard>
                {this.state.copied ? <span>Copied</span> : null}
              </div>
            )}
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
