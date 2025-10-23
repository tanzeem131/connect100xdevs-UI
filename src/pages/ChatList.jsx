import { useState, useEffect } from "react";
import { Loader } from "../components/Loader";
import { TextInputError, TextInputHeading } from "../components/TextInput";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await axios.get(BASE_URL + "/chat/conversations", {
        withCredentials: true,
      });
      // Filter only chats with messages
      const chatsWithMessages = res.data.filter(
        (chat) => chat.message && chat.message.length > 0
      );
      setChats(chatsWithMessages);
    } catch (err) {
      console.error("Error fetching chats:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChatClick = (userId) => {
    navigate(`/chat/${userId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center align-middle items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="mt-5 min-h-screen">
        <TextInputHeading text={"Messages"} />
        <TextInputError
          text={"No conversations yet. Start chatting with your connections!"}
        />
      </div>
    );
  }

  return (
    <div className="mt-5 min-h-screen">
      <TextInputHeading text={"Messages"} />

      {chats.map((chat) => {
        const otherUser = chat.otherUser;
        const lastMessage = chat.message[chat.message.length - 1];
        const unreadCount = chat.unreadCount || 0;

        return (
          <div
            key={chat._id}
            onClick={() => handleChatClick(otherUser._id)}
            className="bg-gray-800 rounded-lg p-6 mb-4 cursor-pointer hover:bg-gray-750 transition-colors border border-gray-700"
          >
            <div className="flex items-start gap-4">
              <div className="relative">
                <img
                  src={otherUser.photoUrl}
                  alt={`${otherUser.firstName} ${otherUser.lastName}`}
                  className="w-16 h-16 rounded-full border-4 border-purple-500 object-cover"
                />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-purple-400 text-xl font-semibold">
                    {otherUser.firstName} {otherUser.lastName}
                  </h3>
                  <span className="text-gray-500 text-sm">
                    {new Date(lastMessage.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-gray-400 line-clamp-2">{lastMessage.text}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
