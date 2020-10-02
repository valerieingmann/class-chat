import React, { Component } from 'react';

import { compose } from 'recompose';

import { AuthUserContext, withAuthorization } from '../Session';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
            <p>
              Give this code to your teacher to connect to their room!
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
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(withAuthorization(condition))(AccountPage);
