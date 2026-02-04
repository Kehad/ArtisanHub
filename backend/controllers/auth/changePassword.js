import bcrypt from 'bcryptjs';
import mockDb from '../../utils/mockDb.js';

// @desc Change Password
// @route POST /auth/change-password
// @access Private
const changePassword = async (req, res) => {
    const { currentPassword, newPassword, userId } = req.body;
    console.log('req.body')
    console.log(req.body)
    // const userId = id;
    console.log('userId');

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Both current and new passwords are required' });
    }

    try {
        // Find user from mockDb
        const user = mockDb.findOne('users', { id: userId });
        console.log(user, 'user');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if current password matches
        const isMatch = (currentPassword === user.password) || (await bcrypt.compare(currentPassword, user.password).catch(() => false));

        console.log(isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid current password' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update user
        // mockDb.update('users', userId, { password: hashedNewPassword });
        mockDb.update('users', userId, { password: newPassword });

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export default changePassword;
