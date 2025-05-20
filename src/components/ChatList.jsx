import { useState } from "react";
import { Avatar } from "./ui/avatar";

const chats = [
  { id: 1, name: "Aadhira", lastMessage: "Hey there!", time: "2m ago" },
  {
    id: 2,
    name: "Pranav",
    lastMessage: "Let’s connect tomorrow",
    time: "10m ago",
  },
  {
    id: 3,
    name: "Meena",
    lastMessage: "Can you check this out?",
    time: "1h ago",
  },
  { id: 4, name: "Rithika", lastMessage: "Miss you 😘", time: "5m ago" },
  { id: 5, name: "Vikram", lastMessage: "Call me back", time: "20m ago" },
  {
    id: 6,
    name: "Sanjana",
    lastMessage: "Meeting rescheduled",
    time: "45m ago",
  },
  { id: 7, name: "Harish", lastMessage: "All good here!", time: "2h ago" },
  {
    id: 8,
    name: "Divya",
    lastMessage: "That was hilarious 😂",
    time: "10h ago",
  },
  { id: 9, name: "Karthik", lastMessage: "Sending the files", time: "1d ago" },
  { id: 10, name: "Shruthi", lastMessage: "Got it, thanks!", time: "3h ago" },
  { id: 11, name: "Anjali", lastMessage: "Waiting for you 💌", time: "7m ago" },
  { id: 12, name: "Rahul", lastMessage: "Let’s meet soon", time: "30m ago" },
  { id: 13, name: "Lakshmi", lastMessage: "Where are you?", time: "1h ago" },
  { id: 14, name: "Surya", lastMessage: "On the way!", time: "25m ago" },
  { id: 15, name: "Preethi", lastMessage: "Don’t forget!", time: "50m ago" },
  { id: 16, name: "Arjun", lastMessage: "Loved the idea 😍", time: "4h ago" },
  { id: 17, name: "Nisha", lastMessage: "I’ll ping you later", time: "2d ago" },
  { id: 18, name: "Deepak", lastMessage: "Cool! 👍", time: "3h ago" },
  { id: 19, name: "Sneha", lastMessage: "Thanks a lot!", time: "6h ago" },
  { id: 20, name: "Yuvaan", lastMessage: "Let’s finalize it", time: "8h ago" },
];

const ChatList = ({ onSelectChat }) => {
  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleSelect = (chat) => {
    setSelectedChatId(chat.id);
    onSelectChat(chat);
  };

    return (
    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
      {chats.map((chat, index) => {
        const isSelected = chat.id === selectedChatId;

        return (
          <div
            key={chat.id}
            onClick={() => handleSelect(chat)}
            className={`flex items-center justify-between p-2 rounded cursor-pointer
              ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100  hover:bg-gray-200 dark:hover:bg-white-700"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <Avatar
                src={`https://i.pravatar.cc/150?img=${index + 1}`}
                alt={chat.name}
                size={40}
              />
              <div className="truncate font-semibold text-base">{chat.name}</div>
              {/* Hide last message on mobile */}
              <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                {chat.lastMessage}
              </div>
            </div>
            {/* Hide time on mobile */}
            <div
              className={`hidden sm:block text-xs ${
                isSelected ? "text-white" : "text-gray-400"
              }`}
            >
              {chat.time}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
