import React from "react";

const Topbar = () => {
  return (
    <div className="h-16 bg-white px-6 flex items-center justify-end shadow">
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="text-lg sm:text-xl font-medium text-black whitespace-nowrap">
          Rohith
        </span>
        <img
          src="https://i.pravatar.cc/150?img=3"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
          alt="profile"
        />
      </div>
    </div>
  );
};

export default Topbar;
