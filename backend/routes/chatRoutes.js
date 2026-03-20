import express from 'express';
import { accessChat } from '../controllers/chat/accessChat.js';
import { fetchChats } from '../controllers/chat/fetchChats.js';
import { sendMessage } from '../controllers/chat/sendMessage.js';
import { allMessages } from '../controllers/chat/allMessages.js';
import verifyJWT from '../middleware/verifyJWT.js'; // Ensure this exists

const router = express.Router();

router.use(verifyJWT); // Protect all routes

router.route('/').post(accessChat);
router.route('/').get(fetchChats);
router.route('/message').post(sendMessage);
router.route('/:chatId').get(allMessages)   ;

export default router;
