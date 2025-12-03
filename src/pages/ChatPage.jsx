// src/pages/ChatPage.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import client from "../api/client";
import Sidebar from "../components/layout/Sidebar";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";
import OnlineUsers from "../components/chat/OnlineUsers";

const ChatPage = () => {
  const { user, logout } = useAuth();
  const { socket, onlineUserIds } = useSocket();

  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    hasMore: true
  });
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Load channels
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const { data } = await client.get("/channels");
        setChannels(data);
        if (!activeChannel && data.length > 0) {
          setActiveChannel(data[0]);
        }
      } catch (err) {
        console.error("Channels error", err);
      }
    };
    fetchChannels();
  }, []);

  // Join socket room on activeChannel change
  useEffect(() => {
    if (!socket || !activeChannel) return;

    socket.emit("channel:join", { channelId: activeChannel._id });
    setMessages([]);
    setPagination({ page: 1, hasMore: true });
    fetchMessages(1, activeChannel._id, true);

    return () => {
      socket.emit("channel:leave", { channelId: activeChannel._id });
    };
  }, [socket, activeChannel?._id]);

  const fetchMessages = async (page, channelId, replace = false) => {
    if (!channelId) return;
    setLoadingMessages(true);
    try {
      const { data } = await client.get(
        `/messages/${channelId}?page=${page}&limit=20`
      );

      setPagination({
        page: data.page,
        hasMore: data.hasMore
      });

      setMessages((prev) => {
        if (replace) return data.messages;
        // older messages should prepend
        return [...data.messages, ...prev];
      });
    } catch (err) {
      console.error("Messages error", err);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Listen for new messages socket event
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg) => {
      if (msg.channel === activeChannel?._id) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("message:new", handleNewMessage);

    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, [socket, activeChannel?._id]);

  const handleSendMessage = (text) => {
    if (!socket || !activeChannel) return;
    socket.emit("message:send", { channelId: activeChannel._id, text });
  };

  const handleLoadMore = () => {
    if (pagination.hasMore && !loadingMessages) {
      fetchMessages(pagination.page + 1, activeChannel._id, false);
    }
  };

  return (
    <div className="w-full h-screen max-h-[720px] max-w-6xl mx-auto px-3 py-4">
      <div className="flex flex-col md:flex-row gap-4 h-full">
        <Sidebar
          user={user}
          channels={channels}
          setChannels={setChannels}
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
          logout={logout}
        />

        <div className="flex-1 glass-card flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Channel
              </p>
              <h2 className="text-lg font-semibold text-white">
                {activeChannel ? `#${activeChannel.name}` : "Select a channel"}
              </h2>
            </div>
            <OnlineUsers onlineUserIds={onlineUserIds} />
          </div>

          <MessageList
            messages={messages}
            activeChannel={activeChannel}
            onLoadMore={handleLoadMore}
            hasMore={pagination.hasMore}
            loading={loadingMessages}
            currentUserId={user?._id}
          />

          <MessageInput
            disabled={!activeChannel}
            onSend={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
