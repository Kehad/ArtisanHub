import express from 'express';
const router = express.Router();
import downloadData from '../controllers/user/downloadData.js';
import deleteAccount from '../controllers/user/deleteAccount.js';
import verifyJWT from '../middleware/verifyJWT.js';

router.use(verifyJWT);

router.route('/download-data')
    .get(downloadData);

router.route('/delete-account')
    .delete(deleteAccount);

export default router;
