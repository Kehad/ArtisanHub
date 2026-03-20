// import jwt from 'jsonwebtoken';

// const verifyJWT = (req, res, next) => {
//     const authHeader = req.headers.authorization || req.headers.Authorization;

//     if (!authHeader?.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const token = authHeader.split(' ')[1];

//     jwt.verify(
//         token,
//         process.env.JWT_SECRET,
//         (err, decoded) => {
//             if (err) return res.status(403).json({ message: 'Forbidden' });
//             req.user = decoded.user;
//             console.log('req.user', decoded.user);
//             next();
//         }
//     );
// };

// export default verifyJWT;

import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import mockDb from '../utils/mockDb.js';

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const userId = decoded?.user?.id || decoded?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token payload' });
        }

        // Try getting user from Mock DB first
        let user = mockDb.findOne('users', { id: userId }) || mockDb.findOne('users', { _id: userId });

        // If not found in Mock DB, try Real DB (if connected)
        if (!user && User && User.findById) {
            try {
                user = await User.findById(userId).select('-password');
            } catch (e) {
                console.log('Real DB not available or error, using Dummy only');
            }
        }

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        // Remove password from mock user if present
        if (user.password) {
            delete user.password;
        }

        req.user = user;
        console.log('req.user fetched successfully');
        
        next();
    } catch (err) {
        console.error('JWT Verification Error:', err.message);
        return res.status(403).json({ message: 'Forbidden' });
    }
};

export default verifyJWT;