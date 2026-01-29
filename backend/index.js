// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import { createServer } from 'http';
// import { Server } from 'socket.io';

// // Routes
// import authRoutes from './routes/authRoutes.js';
// import portfolioRoutes from './routes/portfolio.js';
// import jobRoutes from './routes/jobs.js';
// import chatRoutes from './routes/chatRoutes.js';
// import errorHandler from './middleware/errorHandler.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// const allowedOrigins = [
//     "http://localhost:3000",
//     "http://localhost:5000",
//     "http://192.168.18.3:8081",
//     "http://localhost:8081",
//     "exp://192.168.18.3:8081",
//     "http://10.0.2.2:5000", // Android Emulator loopback
// ];

// app.use(cors());

// // app.use(cors({
// //     origin: function (origin, callback) {
// //         // allow requests with no origin (like mobile apps or curl requests)
// //         if (!origin) return callback(null, true);
// //         if (allowedOrigins.indexOf(origin) === -1) {
// //             return callback(null, true); // Temporarily allow all for debugging, or restrict as needed
// //         }
// //         return callback(null, true);
// //     },
// //     credentials: true
// // }));
// app.use(express.json());

// // Database Connection
// // mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/artisanhub')
// //     .then(() => console.log('MongoDB Connected'))
// //     .catch(err => console.log('MongoDB connection error (falling back to mock DB):'));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/portfolio', portfolioRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/chat', chatRoutes);

// app.use(errorHandler);

// const httpServer = createServer(app);

// const io = new Server(httpServer, {
//     pingTimeout: 60000,
//     cors: {
//         // origin: allowedOrigins,
//         origin: "*",
//         // credentials: true,
//     },
// });

// io.on("connection", (socket) => {
//     console.log("Connected to socket.io");

//     socket.on("setup", (userData) => {
//         socket.join(userData._id);
//         socket.emit("connected");
//     });

//     socket.on("join chat", (room) => {
//         socket.join(room);
//         console.log("User Joined Room: " + room);
//     });

//     socket.on("typing", (room) => socket.in(room).emit("typing"));
//     socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//     socket.on("new message", (newMessageRecieved) => {
//         var chat = newMessageRecieved.chatId;

//         if (!chat.members) return console.log("chat.members not defined");

//         chat.members.forEach((user) => {
//             if (user._id == newMessageRecieved.senderId._id) return;

//             socket.in(user._id).emit("message received", newMessageRecieved);
//         });
//     });

//     socket.off("setup", () => {
//         console.log("USER DISCONNECTED");
//         socket.leave(userData._id);
//     });
// });

// httpServer.listen(PORT, '0.0.0.0', () => {
//     console.log(`Server running on port ${PORT}`);
// });




import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from 'http';

// Routes
import authRoutes from './routes/authRoutes.js';
import portfolioRoutes from './routes/portfolio.js';
import jobRoutes from './routes/jobs.js';
import chatRoutes from './routes/chatRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Allow ALL origins
app.use(cors());
app.use(express.json());

// Database Connection
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/artisanhub')
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log('MongoDB connection error (falling back to mock DB):'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/chat', chatRoutes);

// app.use(errorHandler);

// While you can just use app.listen(), keeping createServer is fine 
// if you plan to add other protocols later.
const httpServer = createServer(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});