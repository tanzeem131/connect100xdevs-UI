import { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userData = useSelector((store) => store.user);
  const userId = userData?._id;

  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  useEffect(() => {
    if (!userId) {
      return;
    }

    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageReceived", ({ newMessage }) => {
      setMessages((messages) => [...messages, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", { userId, targetUserId, newMessage });
    setNewMessage("");
  };

  const fetchChats = async () => {
    const getChats = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    setMessages(
      getChats.data.message.map((msg) => {
        const { senderId, text, createdAt } = msg;
        return {
          senderId,
          text,
          createdAt,
        };
      })
    );
  };

  useEffect(() => {
    fetchChats();
  }, []);

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
      <div className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`text-gray-100 p-[6px] rounded-lg max-w-xs shadow-md 
                ${msg.senderId === userId ? "bg-purple-600" : "bg-gray-800"}
              `}
            >
              <p>{msg.text}</p>
              <span
                className={`text-[10px] mt-1 block text-right" + ${
                  msg.senderId === userId ? "text-white" : "text-gray-500"
                }
                `}
              >
                {new Date(msg.createdAt).toLocaleString("en-US", options)}
              </span>
            </div>
          </div>
        ))}
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
