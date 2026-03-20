import PortfolioItem from '../../models/PortfolioItem.js';
import dbWrapper from '../../utils/dbWrapper.js';

// Get all portfolio items for a user
export const getPortfolioItems = async (req, res) => {
    try {
        const userId = req.user.id || req.user.email; // Support both JWT formats
        const items = await dbWrapper.find(PortfolioItem, 'portfolios', { userId });
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
