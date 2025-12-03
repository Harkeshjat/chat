// // src/components/chat/MessageInput.jsx
// import React, { useState } from "react";

// const MessageInput = ({ disabled, onSend }) => {
//   const [text, setText] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!text.trim() || disabled) return;
//     onSend(text.trim());
//     setText("");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="border-t border-white/5 px-4 py-3 flex items-center gap-2"
//     >
//       <input
//         disabled={disabled}
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder={
//           disabled ? "Select a channel to start chatting..." : "Type a message..."
//         }
//         className="flex-1 bg-slate-900/60 border border-slate-700/80 rounded-xl text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
//       />
//       <button
//         disabled={disabled}
//         className="px-4 py-2 rounded-xl bg-accent hover:bg-indigo-500 text-sm text-white font-medium disabled:opacity-50"
//       >
//         Send
//       </button>
//     </form>
//   );
// };

// export default MessageInput;






import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const MessageInput = ({ disabled, onSend }) => {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
    setShowEmoji(false);
  };

  const onEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="relative">
      {showEmoji && (
        <div className="absolute bottom-14 left-0 z-50">
          <EmojiPicker
            theme="dark"
            onEmojiClick={onEmojiClick}
            height={350}
            width={300}
          />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="border-t border-white/5 px-4 py-3 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => setShowEmoji(!showEmoji)}
          className="text-xl"
        >
          😊
        </button>

        <input
          disabled={disabled}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            disabled
              ? "Select a channel to start chatting..."
              : "Type a message..."
          }
          className="flex-1 bg-slate-900/60 border border-slate-700/80 rounded-xl text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
        />

        <button
          disabled={disabled}
          className="px-4 py-2 rounded-xl bg-accent hover:bg-indigo-500 text-sm text-white font-medium disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
