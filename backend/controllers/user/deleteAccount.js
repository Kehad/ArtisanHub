// @desc Delete Account
// @route DELETE /users/delete-account
// @access Private
const deleteAccount = async (req, res) => {
    const user = req.user; // Added by verifyJWT middleware

    // TODO: Delete user data from DB

    // Clear auth cookie
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    res.json({ message: 'Account deleted successfully' });
};

module.exports = deleteAccount;
