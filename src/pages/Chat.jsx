import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { createSocketConnection } from "../utils/socket";
import useFetchConnections from "../hooks/useFetchConnection";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState({});
  const userData = useSelector((store) => store.user);
  const userId = userData?._id;

  const { connections } = useFetchConnections();

  useEffect(() => {
    if (connections && Array.isArray(connections)) {
      const foundUser = connections?.find((user) => user._id === targetUserId);
      setTargetUser(foundUser);
    }
  }, [connections]);

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

    socket.on("messageReceived", ({ text, createdAt, senderId }) => {
      setMessages((messages) => [...messages, { senderId, text, createdAt }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage) return;
    const optimizedMessage = newMessage.trim();
    const socket = createSocketConnection();
    socket.emit("sendMessage", { userId, targetUserId, optimizedMessage });
    setNewMessage("");
  };

  const fetchChats = async () => {
    const getChats = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    setMessages(
      getChats?.data?.message?.map((msg) => {
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
      <div className="flex items-center justify-between p-4 bg-transparent shadow-md">
        <div className="flex items-center space-x-3">
          <img
            src={targetUser?.photoUrl}
            alt="Recipient Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-purple-600"
          />
          <h2 className="text-xl font-semibold text-purple-600">
            {targetUser?.firstName} {targetUser?.lastName}
          </h2>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-4 chat-background-pattern">
        {messages?.map((msg, index) => (
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
      <div className="p-4 bg-transparent border-t border-gray-800 flex items-center space-x-3 shadow-lg">
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
