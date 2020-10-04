import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';

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
    this.props.firebase.chats().on('value', snapshot => {
      const chatsObject = snapshot.val();
      if (chatsObject) {
        const chatsList = Object.keys(chatsObject).map(key => ({
          ...chatsObject[key],
          uid: key,
        }));

        let myChat = chatsList.filter(
          chat => chat.ownerId === this.props.authUser.uid,
        );

        this.setState({
          chat: myChat[0],
        });
      }
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
    this.setState({ studentId: '' });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ studentId: event.target.value });
  };

  render() {
    return (
      <>
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
        {this.state.error && this.state.error.message}
      </>
    );
  }
}

export default compose(
  withRouter,
  withFirebase,
)(AddStudentBase);
