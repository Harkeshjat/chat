// src/components/layout/Sidebar.jsx
import React, { useState } from "react";
import client from "../../api/client";

const Sidebar = ({
  user,
  channels,
  setChannels,
  activeChannel,
  setActiveChannel,
  logout
}) => {
  const [creating, setCreating] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [error, setError] = useState("");

  const createChannel = async (e) => {
    e.preventDefault();
    if (!channelName.trim()) return;
    try {
      setCreating(true);
      setError("");
      const { data } = await client.post("/channels", { name: channelName });
      setChannels((prev) => [...prev, data]);
      setChannelName("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create channel");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="w-full md:w-72 glass-card flex flex-col p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400">Logged in as</p>
          <p className="text-sm font-medium text-white">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="text-xs px-3 py-1 rounded-full bg-red-600/70 hover:bg-red-500 transition text-white"
        >
          Logout
        </button>
      </div>

      <div className="border-t border-white/5 pt-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
            Channels
          </p>
          <span className="text-[10px] text-gray-500">
            {channels.length} total
          </span>
        </div>

        <div className="max-h-52 overflow-y-auto space-y-1 pr-1 custom-scroll">
          {channels.map((ch) => (
            <button
              key={ch._id}
              onClick={() => setActiveChannel(ch)}
              className={`w-full text-left text-sm px-3 py-2 rounded-xl transition flex items-center justify-between ${
                activeChannel?._id === ch._id
                  ? "bg-accent/80 text-white shadow-lg shadow-indigo-500/30"
                  : "bg-slate-900/60 text-gray-200 hover:bg-slate-800/80"
              }`}
            >
              <span className="truncate">#{ch.name}</span>
              <span className="text-[10px] text-gray-300">
                {ch.memberCount ?? "-"} members
              </span>
            </button>
          ))}

          {channels.length === 0 && (
            <p className="text-xs text-gray-500">
              No channels yet. Create one below 👇
            </p>
          )}
        </div>
      </div>

      <form onSubmit={createChannel} className="mt-auto space-y-2">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          Create channel
        </p>
        <input
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          placeholder="e.g. general, dev, marketing"
          className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl text-xs px-3 py-2 outline-none focus:ring-2 focus:ring-accent"
        />
        {error && <p className="text-[11px] text-red-400">{error}</p>}
        <button
          disabled={creating}
          className="w-full text-xs py-2 rounded-xl bg-accent hover:bg-indigo-500 text-white font-medium disabled:opacity-60"
        >
          {creating ? "Creating..." : "Create channel"}
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
