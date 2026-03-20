import PortfolioItem from '../../models/PortfolioItem.js';
import dbWrapper from '../../utils/dbWrapper.js';

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
