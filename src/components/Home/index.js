import React, { Component } from 'react';
import { compose } from 'recompose';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withAuthorization, AuthUserContext } from '../Session';
import Messages from '../Messages';

class HomePage extends Component {
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
          <div className="box">
            <h1>
              {authUser.classroomName
                ? authUser.classroomName
                : 'My Classroom'}
            </h1>
            {authUser.chatId ? (
              <Messages authUser={authUser} />
            ) : (
              <div className="code">
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

export default compose(withAuthorization(condition))(HomePage);
