import bcrypt from 'bcryptjs';
import mockDb from '../../utils/mockDb.js';

// @desc Change Password
// @route POST /auth/change-password
// @access Private
const changePassword = async (req, res) => {
    const { oldPassword, newPassword, id } = req.body;
    const userId = id;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Both old and new passwords are required' });
    }

    try {
        // Find user from mockDb
        const user = mockDb.findOne('users', { id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if old password matches
        const isMatch = (oldPassword === user.password) || (await bcrypt.compare(oldPassword, user.password).catch(() => false));

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid old password' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update user
        mockDb.update('users', userId, { password: hashedNewPassword });

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export default changePassword;
