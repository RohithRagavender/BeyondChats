import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChatWindow = ({ selectedChat }) => {
  const STORAGE_KEY = `chat_messages_${selectedChat?.id || "default"}`;

  const getChatStyle = (chatId) => {
    const styles = {
      1: "bg-gradient-to-r from-pink-200 to-pink-400",
      2: "bg-gradient-to-r from-blue-200 to-blue-400",
      3: "bg-gradient-to-r from-yellow-100 to-yellow-300",
      4: "bg-gradient-to-r from-purple-200 to-purple-400",
      5: "bg-gradient-to-r from-green-200 to-green-400",
      6: "bg-gradient-to-r from-indigo-200 to-indigo-400",
      7: "bg-gradient-to-r from-red-200 to-red-400",
      8: "bg-gradient-to-r from-teal-200 to-teal-400",
      9: "bg-gradient-to-r from-orange-200 to-orange-400",
      10: "bg-gradient-to-r from-cyan-200 to-cyan-400",
      default: "bg-gradient-to-r from-gray-200 to-gray-300",
    };
    return styles[chatId] || styles.default;
  };

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : [
          { sender: "Aadhira", text: "Hi Darling!" },
          { sender: "Me", text: "Hello 😍" },
        ];
  });

  const [input, setInput] = useState("");
  const [giftMessage, setGiftMessage] = useState(null);
  const [showDeleteFor, setShowDeleteFor] = useState(new Set());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages, STORAGE_KEY]);

  useEffect(() => {
    const saved = localStorage.getItem(
      `chat_messages_${selectedChat?.id || "default"}`
    );
    setMessages(saved ? JSON.parse(saved) : []);
    setShowDeleteFor(new Set());
  }, [selectedChat]);

  const handleSend = () => {
    if (!input.trim()) return;

    const messageToSend = input;
    setGiftMessage(messageToSend);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => {
        const newMessages = [...prev, { sender: "Me", text: messageToSend }];
        const newIndex = newMessages.length - 1;

        setShowDeleteFor((prevSet) => {
          const updatedSet = new Set(prevSet);
          updatedSet.add(newIndex);

          setTimeout(() => {
            setShowDeleteFor((currentSet) => {
              const nextSet = new Set(currentSet);
              nextSet.delete(newIndex);
              return nextSet;
            });
          }, 5000);

          return updatedSet;
        });

        return newMessages;
      });

      setGiftMessage(null);
    }, 3000);
  };

  const handleDelete = (index) => {
    setMessages((prev) => prev.filter((_, i) => i !== index));
    setShowDeleteFor((prevSet) => {
      const updatedSet = new Set(prevSet);
      updatedSet.delete(index);
      return updatedSet;
    });
  };

  return (
    <div className="flex flex-col h-full w-full max-w-full">
      <div className="bg-white dark:bg-blue-500 p-4 font-semibold text-lg text-amber-50">
        Chat with {selectedChat?.name || "Select a chat"}
      </div>

      <div
        className={`flex-1 overflow-y-auto p-4 space-y-2 dark:bg-black-800 chat-pattern ${getChatStyle(
          selectedChat?.id
        )}`}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`w-full md:max-w-md p-3 rounded flex flex-wrap justify-between items-center break-words ${
                msg.sender === "Me"
                  ? "ml-auto bg-blue-600 text-white"
                  : "bg-gray-300 dark:bg-gray-400"
              }`}
            >
              <div>{msg.text}</div>
              {showDeleteFor.has(idx) && msg.sender === "Me" && (
                <button
                  onClick={() => handleDelete(idx)}
                  className="ml-4 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md transition duration-150"
                  aria-label="Delete message"
                  title="Delete message"
                >
                  ✕
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {giftMessage && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="ml-auto w-full md:max-w-md rounded bg-pink-400 text-white relative gift-box break-words"
          >
            <div className="text-center font-bold text-2xl">🎁</div>
            <div className="mt-2 text-center">{giftMessage}</div>
            <div className="sprinkles absolute inset-0 pointer-events-none"></div>
          </motion.div>
        )}
      </div>

      <div className="p-4 border-t bg-white dark:bg-gray-700 flex flex-col sm:flex-row gap-2">
        <input
          className="w-full sm:flex-1 px-3 py-2 rounded border text-black dark:text-white bg-gray-100 dark:bg-gray-800"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer transition-transform duration-150 active:scale-95 active:bg-blue-700"
        >
          Send
        </button>
      </div>

      <style>{`
        .gift-box {
          box-shadow: 0 0 15px 5px rgba(255,105,180,0.7);
          animation: popIn 0.5s ease forwards;
          position: relative;
        }
        .sprinkles {
          pointer-events: none;
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: radial-gradient(circle 3px, #fff 20%, transparent 20%),
                            radial-gradient(circle 3px, #ffc0cb 20%, transparent 20%);
          background-position: 0 0, 10px 10px;
          background-repeat: repeat;
          animation: sprinkleMove 2s linear infinite;
          mix-blend-mode: screen;
          opacity: 0.7;
        }
        @keyframes sprinkleMove {
          0% { background-position: 0 0, 10px 10px; }
          100% { background-position: 20px 20px, 30px 30px; }
        }
      `}</style>
    </div>
  );
};

export default ChatWindow;
