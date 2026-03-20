import express from 'express';
import { accessChat } from '../controllers/chat/accessChat.js';
import { fetchChats } from '../controllers/chat/fetchChats.js';
import { sendMessage } from '../controllers/chat/sendMessage.js';
import { allMessages } from '../controllers/chat/allMessages.js';
import auth from '../middleware/auth.js'; // Ensure this exists

const router = express.Router();

router.use(auth); // Protect all routes

router.route('/').post(accessChat);
router.route('/').get(fetchChats);
router.route('/message').post(sendMessage);
router.route('/:chatId').get(allMessages);

export default router;
