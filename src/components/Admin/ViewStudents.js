import React, { Component } from 'react';

class ViewStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersInRoom: [],
    };
  }

  listenForUsers() {}

  componentDidMount() {
    const chatId = this.props.authUser.chatId;

    let usersInRoom = [];
    // this.props.firebase.users().once('value', snapshot => {
    //   snapshot.forEach(child => {
    //     usersInRoom.push(child.val());
    //   });
    // });

    this.props.firebase.users().on('value', function(snapshot) {
      console.log(Object.values(snapshot.val()));
      let users = Object.values(snapshot.val());
      users.forEach(user => {
        usersInRoom.push(user);
      });
    });

    this.setState({ usersInRoom });
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
              <p>{student.username}</p>
              <p>{student.email}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ViewStudents;
