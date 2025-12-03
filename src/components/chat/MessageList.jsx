// src/components/chat/MessageList.jsx
import React, { useEffect, useRef } from "react";

const MessageList = ({
  messages,
  activeChannel,
  onLoadMore,
  hasMore,
  loading,
  currentUserId
}) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    // scroll to bottom when channel or messages change
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChannel?._id, messages.length]);

  const handleScroll = (e) => {
    const top = e.target.scrollTop;
    if (top === 0 && hasMore && !loading) {
      onLoadMore();
    }
  };

  return (
    <div
      className="flex-1 overflow-y-auto px-4 py-3 space-y-2 text-sm"
      onScroll={handleScroll}
    >
      {loading && messages.length === 0 && (
        <p className="text-xs text-gray-500">Loading messages...</p>
      )}

      {hasMore && messages.length > 0 && (
        <button
          onClick={onLoadMore}
          className="block mx-auto text-[11px] text-gray-400 hover:text-gray-200 py-1"
        >
          Load older messages
        </button>
      )}

      {messages.map((msg) => {
        const isMine = msg.sender?._id === currentUserId;
        return (
          <div
            key={msg._id}
            className={`flex w-full ${
              isMine ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 rounded-2xl text-xs leading-snug shadow ${
                isMine
                  ? "bg-accent text-white rounded-br-sm"
                  : "bg-slate-800/80 text-gray-100 rounded-bl-sm"
              }`}
            >
              {!isMine && (
                <p className="font-semibold text-[11px] text-indigo-300 mb-1">
                  {msg.sender?.name}
                </p>
              )}
              <p>{msg.text}</p>
              <p className="mt-1 text-[10px] text-gray-300/80 text-right">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
            </div>
          </div>
        );
      })}

      {!loading && messages.length === 0 && (
        <div className="h-full flex items-center justify-center text-xs text-gray-500">
          No messages yet. Start the conversation ✨
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
