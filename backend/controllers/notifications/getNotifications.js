
// @desc Get Notifications
// @route GET /notifications
// @access Private
import dbWrapper from '../../utils/dbWrapper.js';

const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id || req.user.email;

        // Fetch notifications from DB (Mock or Real)
        // Passing null as Model since we might not have a Notification Mongoose model yet, 
        // relying on MockDB fallback which works with the collection string.
        const notifications = await dbWrapper.find(null, 'notifications', { userId });

        res.json(notifications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export default getNotifications;
