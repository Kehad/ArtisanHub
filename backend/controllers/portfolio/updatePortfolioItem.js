import PortfolioItem from '../../models/PortfolioItem.js';
import dbWrapper from '../../utils/dbWrapper.js';

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
