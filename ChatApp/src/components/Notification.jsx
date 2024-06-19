import React from "react";
import PropTypes from "prop-types";

export default function Notification({ notifications, removeNotification }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className="bg-white text-black p-2 rounded shadow-md flex justify-between items-center"
        >
          <span>{notification}</span>
          <button
            className="ml-2 text-black"
            onClick={() => removeNotification(index)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}

Notification.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeNotification: PropTypes.func.isRequired,
};
