// @desc Download User Data
// @route GET /users/download-data
// @access Private
const downloadData = async (req, res) => {
    const user = req.user; // Added by verifyJWT middleware

    // TODO: Fetch all user related data from DB
    const mockData = {
        username: user,
        email: "mock@example.com",
        createdAt: new Date(),
        preferences: {}
    };

    res.json(mockData);
};

export default downloadData;
