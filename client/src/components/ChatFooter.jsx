import React, { useState } from "react";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");

  //  send the message to the Node.js server.
  const handleMessage = (e) => {
    e.preventDefault();

    console.log({ userName: localStorage.getItem("userName"), message });

    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }

    setMessage("");
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">Send</button>
      </form>
    </div>
  );
};

export default ChatFooter;
