import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { token } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUserIds, setOnlineUserIds] = useState([]);

  useEffect(() => {
    if (!token) {
      if (socket) socket.disconnect();
      setSocket(null);
      return;
    }

    const s = io(import.meta.env.VITE_API_URL || "http://localhost:5000", {
      auth: { token }
    });

    s.on("connect", () => {
      console.log("Socket connected:", s.id);
    });

    s.on("presence:update", ({ onlineUserIds: list }) => {
      setOnlineUserIds(list || []);
    });

    s.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket, onlineUserIds }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
