import Message from '../../models/Message.js';
import User from '../../models/User.js';
import dbWrapper from '../../utils/dbWrapper.js';

// Helper to manually populate chat members
export const populateChat = async (chat) => {
    if (!chat) return null;
    const populatedMembers = await Promise.all(chat.members.map(async (memberId) => {
        const user = await dbWrapper.findById(User, 'users', memberId);
        if (user) {
            // Return safe user object
            return { _id: user._id || user.id, name: user.name, email: user.email, pic: user.pic };
        }
        return memberId;
    }));

    // Populate lastMessageId if exists
    let populatedLastMessage = chat.lastMessageId;
    if (chat.lastMessageId) {
        const msg = await dbWrapper.findById(Message, 'messages', chat.lastMessageId);
        if (msg) {
            populatedLastMessage = msg;
            // Nested populate sender in message
            const sender = await dbWrapper.findById(User, 'users', msg.senderId);
            if (sender) {
                populatedLastMessage = { ...msg, senderId: { _id: sender._id || sender.id, name: sender.name, email: sender.email } };
            }
        }
    }

    return { ...chat, members: populatedMembers, lastMessageId: populatedLastMessage };
};
