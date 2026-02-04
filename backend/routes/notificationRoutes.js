import express from 'express';
import verifyJWT from '../middleware/auth.js';
import getNotifications from '../controllers/notifications/getNotifications.js';

const router = express.Router();

router.use(verifyJWT);

router.route('/')
    .get(getNotifications);

export default router;
