import React, { Component } from 'react';

class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li className="msg">
        <p className="msg-username">
          <strong>{message.username}</strong>
          {/* {message.editedAt && <span>(Edited)</span>} */}
        </p>
        <span className="msg-text">{message.text}</span>

        {authUser.uid === message.userId && (
          // <span>
          //   {editMode ? (
          //     <span>
          //       <button onClick={this.onSaveEditText}>Save</button>
          //       <button onClick={this.onToggleEditMode}>Reset</button>
          //     </span>
          //   ) : (
          //     <button onClick={this.onToggleEditMode}>Edit</button>
          //   )}

          <button
            className="delete-btn"
            type="button"
            onClick={() => onRemoveMessage(message.uid)}
          >
            Delete
          </button>
        )}
      </li>
    );
  }
}

export default MessageItem;
