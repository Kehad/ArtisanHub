import express from 'express';
import {
    getPortfolioItems,
    createPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem
} from '../controllers/portfolioController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET api/portfolio
// @desc    Get all portfolio items
// @access  Private
router.get('/', auth, getPortfolioItems);

// @route   POST api/portfolio
// @desc    Create a portfolio item
// @access  Private
router.post('/', auth, createPortfolioItem);

// @route   PUT api/portfolio/:id
// @desc    Update portfolio item
// @access  Private
router.put('/:id', auth, updatePortfolioItem);

// @route   DELETE api/portfolio/:id
// @desc    Delete portfolio item
// @access  Private
router.delete('/:id', auth, deletePortfolioItem);

export default router;
