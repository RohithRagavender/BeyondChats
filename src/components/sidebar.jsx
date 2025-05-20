import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Inbox, Settings, Menu } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-500 text-white sm:hidden"
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-blue-500 text-white flex flex-col w-60 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          sm:translate-x-0 sm:static sm:w-60`}
      >
        <div className="p-4 text-xl font-bold">BeyondChats</div>
        <nav className="flex-1 p-4 space-y-4">
          <Link
            to="/"
            className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
            onClick={() => setIsOpen(false)}
          >
            <Home size={20} /> Dashboard
          </Link>
          <Link
            to="/inbox"
            className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
            onClick={() => setIsOpen(false)}
          >
            <Inbox size={20} /> Inbox
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded"
            onClick={() => setIsOpen(false)}
          >
            <Settings size={20} /> Settings
          </Link>
        </nav>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 sm:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
