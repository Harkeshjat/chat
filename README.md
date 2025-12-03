# 💬 Real-Time Chat Application (MERN Stack)

This is a full-stack real-time chat application inspired by modern apps like Slack and WhatsApp.  
Users can create accounts, log in, join channels, and communicate instantly in real-time.

---

## About This Project

I built this project to practice:
- Authentication systems
- Backend APIs
- Real-time communication (Socket.IO)
- Frontend & Backend integration
- Deployment on production server

---

## Live Project

Frontend: https://chatingcom.netlify.app  
Backend: https://web-service-q3hh.onrender.com  

---

## Features

- Register / Login
- JWT Authentication
- Channels
- Live chat
- Emoji support
- Delete messages
- Online users
- MongoDB database
- Responsive UI

---

## Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- Axios
- Socket.IO Client

Backend:
- Node.js
- Express
- MongoDB
- JWT
- Socket.IO

---

## Folder Structure

backend:
- models
- routes
- controllers
- middleware
- socket
- config
- server.js

frontend:
- src
- components
- pages
- context
- hooks
- api
- App.jsx
- main.jsx

---

## Environment Setup

Frontend `.env`:
VITE_API_URL=http://localhost:5000

Backend `.env`:
PORT=5000  
MONGO_URI=your_mongo_url  
JWT_SECRET=your_secret_key  
CLIENT_ORIGIN=http://localhost:5173  

---

## Run Locally

Backend:
git clone https://github.com/Harkeshjat/web-service.git  
cd web-service  
npm install  
npm run dev  

Frontend:
git clone https://github.com/Harkeshjat/chat-frontend.git  
cd chat-frontend  
npm install  
npm run dev  

Open browser at: http://localhost:5173

---

## Author

Harkesh Jat  
https://github.com/Harkeshjat
