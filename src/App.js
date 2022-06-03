import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io.connect("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", message);
  };

  useEffect(() => {
    socket.on("send_message", (data) => {
      console.log("Message received from server: ", data);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        placeholder="SendMessage"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button onClick={sendMessage}>Send message</button>
      <div>{messageReceived}</div>
    </div>
  );
}

export default App;
