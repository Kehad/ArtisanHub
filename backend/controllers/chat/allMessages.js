import Message from '../../models/Message.js';
import User from '../../models/User.js';
import dbWrapper from '../../utils/dbWrapper.js';

// Fetch all messages for a chat
export const allMessages = async (req, res) => {
    try {
        // mockDb find supports exact match, so { chatId: ... } works if chatId matches exactly
        // Warning: if in DB chatId is stored as string vs ObjectId, strict match might fail if types differ.
        // Assuming consistent usage (strings in JSON db).
        const allMsgs = await dbWrapper.find(Message, 'messages', { chatId: req.params.chatId });

        // Populate sender and chat
        const populatedMsgs = await Promise.all(allMsgs.map(async msg => {
            const sender = await dbWrapper.findById(User, 'users', msg.senderId);
            // We just need sender details usually
            return {
                ...msg,
                senderId: sender ? { _id: sender._id || sender.id, name: sender.name, email: sender.email, pic: sender.pic } : msg.senderId,
                chatId: msg.chatId // usually not needed fully populated in message list, but can be if needed
            };
        }));

        res.json(populatedMsgs);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
