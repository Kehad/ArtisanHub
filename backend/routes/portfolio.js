import express from 'express';
import { getPortfolioItems } from '../controllers/portfolio/getPortfolioItems.js';
import { createPortfolioItem } from '../controllers/portfolio/createPortfolioItem.js';
import { updatePortfolioItem } from '../controllers/portfolio/updatePortfolioItem.js';
import { deletePortfolioItem } from '../controllers/portfolio/deletePortfolioItem.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

// @route   GET api/portfolio
// @desc    Get all portfolio items
// @access  Private
router.get('/', verifyJWT, getPortfolioItems);

// @route   POST api/portfolio
// @desc    Create a portfolio item
// @access  Private
router.post('/', verifyJWT, createPortfolioItem);

// @route   PUT api/portfolio/:id
// @desc    Update portfolio item
// @access  Private
router.put('/:id', verifyJWT, updatePortfolioItem);

// @route   DELETE api/portfolio/:id
// @desc    Delete portfolio item
// @access  Private
router.delete('/:id', verifyJWT, deletePortfolioItem);

export default router;
