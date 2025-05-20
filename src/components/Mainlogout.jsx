import Sidebar from "../components/sidebar";
import ChatWindow from "../components/ChatWindow";
import { useState } from "react";

const MainLayout = ({ selectedChat }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <ChatWindow selectedChat={selectedChat} />
      </div>
    </div>
  );
};

export default MainLayout;
