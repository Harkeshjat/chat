// src/components/layout/TopBar.jsx
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";

const TopBar = ({ activeChannel }) => {
  const { user, logout } = useAuth();
  const { onlineUserIds } = useSocket();

  return (
    <div className="w-full glass-card flex items-center justify-between px-4 py-3 border border-white/5">
      {/* LEFT: BRAND + CHANNEL */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-accent text-white flex items-center justify-center font-bold">
          💬
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            Active Channel
          </p>
          <h2 className="text-sm sm:text-base font-semibold text-white truncate max-w-[140px] sm:max-w-xs">
            {activeChannel ? `#${activeChannel.name}` : "No Channel Selected"}
          </h2>
        </div>
      </div>

      {/* RIGHT: STATUS + USER */}
      <div className="flex items-center gap-3">
        {/* Online Count */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-300">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          {onlineUserIds.length} online
        </div>

        {/* User Chip */}
        <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1">
          <div className="h-7 w-7 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-semibold uppercase">
            {user?.name?.charAt(0)}
          </div>
          <span className="hidden sm:inline text-xs text-gray-200">
            {user?.name}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="text-xs px-3 py-1 rounded-full 
          bg-red-600/70 hover:bg-red-500 transition text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;
