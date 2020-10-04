import React from 'react';

const MessageItem = props => {
  const { authUser, message, onRemoveMessage } = props;
  const time = new Date(message.createdAt).toLocaleString([], {
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <div className="msg">
      <p className="msg-username">
        <strong>{message.username}</strong>
        <span className="time">{time}</span>
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
    </div>
  );
};

export default MessageItem;
