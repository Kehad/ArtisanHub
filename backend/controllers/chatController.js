import Chat from '../models/Chat.js';
import Message from '../models/Message.js';
import User from '../models/User.js';
import dbWrapper from '../utils/dbWrapper.js';

// Helper to manually populate chat members
const populateChat = async (chat) => {
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
