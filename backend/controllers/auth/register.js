import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../../models/User.js';
import dbWrapper from '../../utils/dbWrapper.js';

// @desc Signup New User
// @route POST /auth/signup
// @access Public
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // console.log(req);
        console.log(req.path);
        const protocol = req.headers['x-forwarded-proto'] || req.protocol;
        const host = req.headers['host'];
        const fullUrl = `${protocol}://${host}${req.originalUrl}`;
        const deviceId = req.headers['x-device-id'] || req.body.deviceId || null;

        console.log('Full URL:', fullUrl);
        console.log('Device ID:', deviceId);

        // Check if user exists
        let user = await dbWrapper.findOne(User, 'users', { email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = await dbWrapper.create(User, 'users', {
            name,
            email,
            password: hashedPassword,
            role: role || 'developer',
        });

        // Create Payload
        const payload = {
            user: {
                id: user.id || user._id,
            },
        };

        // Sign Token
        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id || user._id, name: user.name, email: user.email, role: user.role } });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export default register;
