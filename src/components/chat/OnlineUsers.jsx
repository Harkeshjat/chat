// src/components/chat/OnlineUsers.jsx
import React from "react";

const OnlineUsers = ({ onlineUserIds }) => {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-300">
      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
      <span>{onlineUserIds.length} online</span>
    </div>
  );
};

export default OnlineUsers;
