import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    client: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    budget: {
        type: String,
        required: true,
    },
    posted: {
        type: String, // e.g. "2h ago" - simplified for now
        required: true,
    },
    tags: [{
        type: String,
    }],
    urgent: {
        type: Boolean,
        default: false,
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Job', jobSchema);
