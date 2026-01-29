import mongoose from 'mongoose';

const portfolioItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL or base64 string
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    date: {
        type: String, // Or Date, keeping string for simplicity to match frontend format for now
        default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('PortfolioItem', portfolioItemSchema);
