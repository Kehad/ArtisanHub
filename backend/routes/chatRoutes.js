import express from 'express';
import { accessChat, fetchChats, sendMessage, allMessages } from '../controllers/chatController.js';
import auth from '../middleware/auth.js'; // Ensure this exists

const router = express.Router();

router.use(auth); // Protect all routes

router.route('/').post(accessChat);
router.route('/').get(fetchChats);
router.route('/message').post(sendMessage);
router.route('/:chatId').get(allMessages);

export default router;
