import Chat from '../../models/Chat.js';
import dbWrapper from '../../utils/dbWrapper.js';
import { populateChat } from './chatHelper.js';

// Create or access a chat between two users
export const accessChat = async (req, res) => {
    const { userId } = req.body; // The ID of the user to chat with (Target User)

    if (!userId) {
        return res.status(400).send("UserId param not sent with request");
    }

    try {
        // Fetch all chats and filter in memory since dbWrapper/mockDb supports only exact matches
        const allChats = await dbWrapper.find(Chat, 'chats', {});

        const currentUserId = req.user.id || req.user.email;

        // Find chat with both users (assuming 1-on-1 chat)
        let isChat = allChats.find(c =>
            c.members &&
            c.members.length === 2 &&
            c.members.some(m => m.toString() === currentUserId.toString()) &&
            c.members.some(m => m.toString() === userId.toString())
        );

        if (isChat) {
            const fullChat = await populateChat(isChat);
            res.send(fullChat);
        } else {
            // Create new chat
            var chatData = {
                chatName: "sender",
                members: [currentUserId, userId],
                createdAt: new Date(),
                updatedAt: new Date(),
                lastMessage: ""
            };

            const createdChat = await dbWrapper.create(Chat, 'chats', chatData);
            const fullChat = await populateChat(createdChat);
            res.status(200).json(fullChat);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};
