import Chat from '../../models/Chat.js';
import dbWrapper from '../../utils/dbWrapper.js';
import { populateChat } from './chatHelper.js';

// Fetch all chats for a user
export const fetchChats = async (req, res) => {
    try {
        const currentUserId = req.user.id || req.user.email;
        const allChats = await dbWrapper.find(Chat, 'chats', {});

        // Filter chats where user is a member
        const userChats = allChats.filter(c =>
            c.members && c.members.some(m => m.toString() === currentUserId.toString())
        );

        // Populate all
        const results = await Promise.all(userChats.map(async chat => await populateChat(chat)));

        // Sort by updatedAt desc
        results.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        res.status(200).send(results);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
