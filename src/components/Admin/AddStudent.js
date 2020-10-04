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
      added: false,
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
    const { chat, studentId } = this.state;
    this.props.firebase.user(studentId).update({
      chatId: chat.uid,
      classroomName: this.props.authUser.classroomName,
    });
    this.props.firebase.user(studentId).once('value', snapshot => {
      if (!snapshot.val().email) {
        this.setState({
          error: { message: 'Sorry, that is not a valid user id.' },
        });
      }
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
        <form className="form" onSubmit={this.onSubmit}>
          <input
            name="studentId"
            value={this.state.studentId}
            onChange={this.onChange}
            type="text"
            placeholder="Student ID"
          />

          <button type="submit">Add Student to My Room</button>
        </form>
        <p>{this.state.error && this.state.error.message}</p>
      </>
    );
  }
}

export default compose(
  withRouter,
  withFirebase,
)(AddStudentBase);
