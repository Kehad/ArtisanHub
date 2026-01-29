import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../../models/User.js'; // Real model
import mockDb from '../../utils/mockDb.js'; // Dummy DB

// @desc Login
// @route POST /auth/login
// @access Public
const login = async (req, res) => {
    try {
        // console.log(req)
        const { email, password } = req.body;
        console.log('Login attempt for:', email);

        // Try getting user from Mock DB first (Dummy mode)
        let user = mockDb.findOne('users', { email });

        // If not found in Mock DB, try Real DB (if connected)
        if (!user && User && User.findOne) {
            try {
                user = await User.findOne({ email });
            } catch (e) {
                console.log('Real DB not available, using Dummy only');
            }
        }

        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Check password
        const isMatch = (password === user.password) || (await bcrypt.compare(password, user.password).catch(() => false));

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Return Token
        const userId = user._id || user.id;
        const payload = {
            user: {
                id: userId,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: userId,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        pic: user.pic,
                        bio: user.bio,
                        location: user.location,
                        phone: user.phone,
                        
                    }
                });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export default login;
