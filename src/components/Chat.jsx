import { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userData = useSelector((store) => store.user);
  const userId = userData?._id;

  useEffect(() => {
    if (!userId) {
      return;
    }

    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageReceived", ({ newMessage }) => {
      console.log(newMessage);
      setMessages((messages) => [...messages, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", { userId, targetUserId, newMessage });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-100">
      <div className="flex items-center justify-between p-4 bg-gray-900 shadow-md">
        <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Placeholder for recipient's photo
            alt="Recipient Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
          />
          <h2 className="text-xl font-semibold text-purple-400">John Doe</h2>{" "}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((message, index) => (
          <div key={index} className="flex justify-start">
            <div className="bg-gray-800 text-gray-100 p-3 rounded-lg max-w-xs shadow-md">
              <p>{message}</p>
              <span className="text-xs text-gray-500 mt-1 block text-right">
                10:00 AM
              </span>
            </div>
          </div>
        ))}
        {/* Example incoming message */}
        {/* <div className="flex justify-start">
          <div className="bg-gray-800 text-gray-100 p-3 rounded-lg max-w-xs shadow-md">
            <p>Hey there! How are you?</p>
            <span className="text-xs text-gray-500 mt-1 block text-right">
              10:00 AM
            </span>
          </div>
        </div> */}

        {/* Example outgoing message */}
        {/* <div className="flex justify-end">
          <div className="bg-purple-600 text-white p-3 rounded-lg max-w-xs shadow-md">
            <p>I'm doing great, thanks for asking! How about you?</p>
            <span className="text-xs text-purple-200 mt-1 block text-right">
              10:02 AM
            </span>
          </div>
        </div> */}

        {/* Another example incoming message */}
        {/* <div className="flex justify-start">
          <div className="bg-gray-800 text-gray-100 p-3 rounded-lg max-w-xs shadow-md">
            <p>Doing pretty well! Just finishing up some work.</p>
            <span className="text-xs text-gray-500 mt-1 block text-right">
              10:05 AM
            </span>
          </div>
        </div> */}
      </div>

      <div className="p-4 bg-gray-900 border-t border-gray-800 flex items-center space-x-3 shadow-lg">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-full bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        />
        <button
          onClick={sendMessage}
          className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-colors duration-200 shadow-md"
        >
          <BsFillSendFill />
        </button>
      </div>
    </div>
  );
};

export default Chat;
