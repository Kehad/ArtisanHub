import PortfolioItem from '../../models/PortfolioItem.js';
import dbWrapper from '../../utils/dbWrapper.js';

// Create a new portfolio item
export const createPortfolioItem = async (req, res) => {
    try {
        const { title, category, image, date } = req.body;
        const userId = req.user.id || req.user.email;

        const item = await dbWrapper.create(PortfolioItem, 'portfolios', {
            title,
            category,
            image,
            date,
            userId,
        });

        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
