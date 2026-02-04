import express from 'express';
import login from '../controllers/auth/login.js';
import logout from '../controllers/auth/logout.js';
import register from '../controllers/auth/register.js';
import forgotPassword from '../controllers/auth/forgotPassword.js';
import changePassword from '../controllers/auth/changePassword.js';
import verifyJWT from '../middleware/auth.js';

const router = express.Router();

// router.route('/login')
//     .post(login);

router.post('/login', login)

router.route('/register')
    .post(register);

router.route('/forgot-password')
    .post(forgotPassword);

router.route('/logout')
    .post(logout);

router.route('/change-password')
    .post(changePassword);
    // .post(verifyJWT, changePassword)

// 
export default router;
