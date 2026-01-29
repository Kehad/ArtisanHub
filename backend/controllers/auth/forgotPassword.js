// @desc Forgot Password
// @route POST /auth/forgot-password
// @access Public
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    // TODO: Verify email exists in DB
    // TODO: Generate reset token
    // TODO: Send email with reset link

    res.json({ message: 'If that email exists, a password reset link has been sent.' });
};

export default forgotPassword;
