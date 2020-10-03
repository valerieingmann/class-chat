import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { AuthUserContext } from '../Session';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase';
import ViewStudents from './ViewStudents';

class AddStudentBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: '',
      error: null,
      chat: {},
    };
  }

  componentDidMount() {
    // this.props.firebase.chats().on('value', snapshot => {
    //   const chatsObject = snapshot.val();
    //   if (chatsObject) {
    //     const chatsList = Object.keys(chatsObject).map(key => ({
    //       ...chatsObject[key],
    //       uid: key,
    //     }));

    //     let myChat = chatsList.filter(
    //       chat => chat.ownerId === this.props.authUser.uid,
    //     );
    let myChat;
    this.props.firebase
      .chats()
      .orderByChild('chatId')
      .equalTo(this.props.authUser.chatId)
      .on('child_added', snapshot => {
        myChat = snapshot.value();
      });

    this.setState({
      chat: myChat,
    });
  }

  componentWillUnmount() {
    this.props.firebase.chats().off();
  }

  onSubmit = event => {
    this.props.firebase.user(this.state.studentId).update({
      chatId: this.state.chat.uid,
      classroomName: this.props.authUser.classroomName,
    });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ studentId: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="studentId"
          value={this.state.studentId}
          onChange={this.onChange}
          type="text"
          placeholder="Student ID"
        />

        <button type="submit">Add Student to My Room</button>
      </form>
    );
  }
}

const AddStudent = compose(
  withRouter,
  withFirebase,
)(AddStudentBase);

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
          <div>
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
