import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io'; // Added socket.io back for future use

// Route imports
import authRoutes from './routes/authRoutes.js';
import portfolioRoutes from './routes/portfolio.js';
import jobRoutes from './routes/jobs.js';
import chatRoutes from './routes/chatRoutes.js';
import userRoutes from './routes/userRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Main Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);

// Error Handling (Must be last)
// app.use(errorHandler);

const httpServer = createServer(app);

// Keep Socket.io setup but commented if not fully implemented or restricted
/*
const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup", (userData) => {
        socket.join(userData._id || userData.id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chatId;
        if (!chat.members) return;

        chat.members.forEach((user) => {
            if (user._id == newMessageRecieved.senderId._id) return;
            socket.in(user._id).emit("message received", newMessageRecieved);
        });
    });
});
*/

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});