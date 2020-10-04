import React, { Component } from 'react';

class ViewStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  listenForUsers = () => {
    this.props.firebase.users().on('value', snapshot => {
      let users = [];
      Object.entries(snapshot.val()).forEach(user => {
        user[1].uid = user[0];
        users.push(user[1]);
      });

      console.log(users);

      // let users = Object.values(snapshot.val());
      this.setState({ users });
    });
  };

  removeStudent = (studentId, event) => {
    this.props.firebase
      .user(studentId)
      .update({ chatId: null, classroomName: null });
  };

  componentDidMount() {
    this.listenForUsers();
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    let myStudents = [];
    if (this.state.users.length) {
      myStudents = this.state.users.filter(user => {
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
                <button
                  onClick={event =>
                    this.removeStudent(student.uid, event)
                  }
                  type="button"
                >
                  Remove student
                </button>
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
