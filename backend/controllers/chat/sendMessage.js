import Chat from '../../models/Chat.js';
import Message from '../../models/Message.js';
import User from '../../models/User.js';
import dbWrapper from '../../utils/dbWrapper.js';

// Send a message
export const sendMessage = async (req, res) => {
    const { chatId, content } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    try {
        const currentUserId = req.user.id || req.user.email;

        var newMessage = {
            senderId: currentUserId,
            text: content,
            chatId: chatId,
            readBy: []
        };

        let message = await dbWrapper.create(Message, 'messages', newMessage);

        // Populate sender
        const sender = await dbWrapper.findById(User, 'users', currentUserId);
        message = {
            ...message,
            senderId: sender ? { _id: sender._id || sender.id, name: sender.name, email: sender.email } : message.senderId
        };

        // Populate chat
        let chat = await dbWrapper.findById(Chat, 'chats', chatId);
        if (chat) {
            const userMembers = await Promise.all(chat.members.map(async mId => {
                const u = await dbWrapper.findById(User, 'users', mId);
                return u ? { _id: u._id || u.id, name: u.name, email: u.email } : mId;
            }));
            message.chatId = { ...chat, members: userMembers };

            // Update Chat with latest message
            await dbWrapper.update(Chat, 'chats', chatId, {
                lastMessage: content,
                lastMessageId: message._id || message.id // Note: message object from create might have _id or id depending on mock/mongo
            });
        }

        res.json(message);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
