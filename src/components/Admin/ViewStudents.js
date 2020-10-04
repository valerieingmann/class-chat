import React, { Component } from 'react';

class ViewStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersInRoom: [],
    };
  }

  listenForUsers = () => {
    this.props.firebase.users().on('value', snapshot => {
      let users = Object.values(snapshot.val());
      this.setState({ usersInRoom: users });
    });
  };

  componentDidMount() {
    this.listenForUsers();
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    let myStudents = [];
    if (this.state.usersInRoom.length) {
      myStudents = this.state.usersInRoom.filter(user => {
        return (
          user.email !== this.props.authUser.email &&
          user.chatId === this.props.authUser.chatId
        );
      });
    }

    return (
      <div>
        <h3>My Students</h3>
        {myStudents.map(student => {
          return (
            <div key={student.email}>
              <p>
                <strong>{student.username}</strong>
              </p>
              <p>{student.email}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ViewStudents;
