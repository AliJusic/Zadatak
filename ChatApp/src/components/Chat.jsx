import React from "react";
import ChatMessage from "./ChatMessage";
import PropTypes from "prop-types";
import { useRef, useEffect } from "react";

export default function Chat(props) {
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.chat]);

  return (
    <div className="relative flex-grow flex flex-col-reverse h-full w-full overflow-y-auto">
      <ul className="space-y-2">
        {props.chat.map((chat) => (
          <li key={chat.id}>
            <ChatMessage
              user={chat.user.name}
              message={chat.message}
              isMyMessage={false}
            />
          </li>
        ))}
        <div ref={chatEndRef} />
      </ul>
    </div>
  );
}

Chat.propTypes = {
  chat: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      isMyMessage: PropTypes.bool.isRequired,
    })
  ).isRequired,
};
