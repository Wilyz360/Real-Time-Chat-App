import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Message from "./Message";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server");
    });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit("sendMessage", { text: messageText });
    setMessageText("");
  };

  return (
    <div className="App">
      <h1>Real-Time Chat App</h1>
      <div className="messages">
        {messages.map((message, index) => (
          <Message
            key={index}
            username={message.username}
            text={message.text}
          />
        ))}
      </div>
      <div>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
