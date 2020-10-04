import React from 'react';

const MessageItem = props => {
  const { authUser, message, onRemoveMessage } = props;

  return (
    <li className="msg">
      <p className="msg-username">
        <strong>{message.username}</strong>
      </p>
      <span className="msg-text">{message.text}</span>
      {authUser.uid === message.userId && (
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
};

export default MessageItem;
