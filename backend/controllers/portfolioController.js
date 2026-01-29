import PortfolioItem from '../models/PortfolioItem.js';
import dbWrapper from '../utils/dbWrapper.js';

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

// Update a portfolio item
export const updatePortfolioItem = async (req, res) => {
    const { title, category, image } = req.body;
    const itemFields = {};
    if (title) itemFields.title = title;
    if (category) itemFields.category = category;
    if (image) itemFields.image = image;

    try {
        let item = await dbWrapper.findById(PortfolioItem, 'portfolios', req.params.id);

        if (!item) return res.status(404).json({ msg: 'Item not found' });

        // Make sure user owns item
        const userId = req.user.id || req.user.email;
        if (item.userId.toString() !== userId.toString()) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        item = await dbWrapper.update(PortfolioItem, 'portfolios', req.params.id, itemFields);
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete portfolio item
export const deletePortfolioItem = async (req, res) => {
    try {
        let item = await dbWrapper.findById(PortfolioItem, 'portfolios', req.params.id);

        if (!item) return res.status(404).json({ msg: 'Item not found' });

        const userId = req.user.id || req.user.email;
        if (item.userId.toString() !== userId.toString()) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await dbWrapper.delete(PortfolioItem, 'portfolios', req.params.id);
        res.json({ msg: 'Item removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
