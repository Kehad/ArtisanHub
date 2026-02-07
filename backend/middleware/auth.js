import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    // console.log('token', token);

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            // console.log('decoded', decoded);
            // console.log(err)
            if (err) return res.status(403).json({ message: 'Forbidden' });
            req.user = decoded.user;
            // console.log('req.user', decoded.user);
            next();
        }
    );
};

export default verifyJWT;

// decoded { user: { id: '1769653851379' }, iat: 1770414923, exp: 1770418523 }