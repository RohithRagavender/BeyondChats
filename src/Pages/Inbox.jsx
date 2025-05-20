// src/pages/Inbox.jsx
import { useState } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

const Inbox = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex h-full">
      <div className="w-1/3 bg-grey-200 p-4 border-r">
        <h2 className="font-semibold mb-4 text-2xl">CHAT LISTS</h2>
        <ChatList onSelectChat={setSelectedChat} />
      </div>
      <div className="flex-1 bg-gray-50 dark:bg-gray-800">
        <ChatWindow selectedChat={selectedChat} />
      </div>
    </div>
  );
};

export default Inbox;
