// src/components/chat/ChannelList.jsx
import React from "react";

const ChannelList = ({
  channels,
  activeChannel,
  setActiveChannel,
  loading = false
}) => {
  return (
    <div className="flex flex-col space-y-1">
      {/* TITLE */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs uppercase tracking-wide text-gray-400">
          Channels
        </p>
        <span className="text-[10px] text-gray-500">
          {channels.length}
        </span>
      </div>

      {/* LIST */}
      <div className="max-h-60 overflow-y-auto pr-1 space-y-1">
        {loading && (
          <p className="text-xs text-gray-400">Loading channels...</p>
        )}

        {!loading && channels.length === 0 && (
          <p className="text-xs text-gray-500">
            No channels yet. Create one 🚀
          </p>
        )}

        {channels.map((channel) => {
          const isActive = activeChannel?._id === channel._id;

          return (
            <button
              key={channel._id}
              onClick={() => setActiveChannel(channel)}
              className={`group w-full text-left text-sm px-3 py-2 rounded-xl flex items-center justify-between transition
                ${
                  isActive
                    ? "bg-accent text-white shadow-lg shadow-indigo-500/30"
                    : "bg-slate-900/60 text-gray-200 hover:bg-slate-800/70"
                }
              `}
            >
              {/* LEFT SIDE */}
              <div className="flex items-center gap-2 truncate">
                <span className="text-xs font-mono">
                  #
                </span>
                <span className="truncate">
                  {channel.name}
                </span>
              </div>

              {/* RIGHT SIDE */}
              <span className="text-[10px] text-gray-300 opacity-70 group-hover:opacity-100">
                {channel.memberCount ?? 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChannelList;
