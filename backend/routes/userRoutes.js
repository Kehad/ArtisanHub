const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const downloadData = require('../controllers/user/downloadData');
const deleteAccount = require('../controllers/user/deleteAccount');

router.use(verifyJWT);

router.route('/download-data')
    .get(downloadData);

router.route('/delete-account')
    .delete(deleteAccount);

module.exports = router;
