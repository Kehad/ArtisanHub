import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../db.json');

const initialData = {
    users: [
        {
            profile: {
                _id: '1',
                name: 'John Doe',
                email: 'keahnney01@gmail.com',
                password: 'password',
                role: 'artisan'
            },
            portfolios: [],
            jobs: [],
            chats: [],
            messages: []
        }
    ]
};

class MockDb {
    constructor() {
        if (!fs.existsSync(DB_PATH)) {
            this.save(initialData);
        }
    }

    read() {
        try {
            const data = fs.readFileSync(DB_PATH, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error("Error reading DB:", err);
            return initialData;
        }
    }

    save(data) {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    }

    // Helper to get all items of a collection type across all users or top-level
    getAllItems(data, collection) {
        if (collection === 'users') {
            return data.users.map(u => ({ ...u.profile, _fullData: u }));
        }

        const itemsMap = new Map();

        // 1. Get top-level items if they exist
        if (data[collection] && Array.isArray(data[collection])) {
            data[collection].forEach(item => {
                if (item._id) itemsMap.set(item._id.toString(), item);
            });
        }

        // 2. Get nested items (legacy support or user-specific items)
        const nestedItems = data.users.flatMap(u => (u[collection] || []));
        nestedItems.forEach(item => {
            if (item._id && !itemsMap.has(item._id.toString())) {
                itemsMap.set(item._id.toString(), item);
            }
        });

        return Array.from(itemsMap.values());
    }

    // Generic CRUD helpers
    find(collection, query = {}) {
        const data = this.read();
        const items = this.getAllItems(data, collection);
        // console.log(items)

        return items.filter(item => {
            return Object.keys(query).every(key => {
                const val = key === 'id' ? item._id : item[key]; // Map 'id' query to '_id'
                // Handle rough equality for mock (strings vs numbers)
                return val == query[key];
            });
        });
    }

    findOne(collection, query = {}) {
        const results = this.find(collection, query);
        console.log(results, 'results');

        return results.length > 0 ? results[0] : null;
    }

    insert(collection, item) {
        const data = this.read();
        // Generate ID
        const newItem = {
            ...item,
            _id: item._id || Date.now().toString(),
            createdAt: new Date().toISOString()
        };

        if (collection === 'users') {
            // New user structure
            const newUser = {
                profile: newItem,
                portfolios: [],
                jobs: [],
                chats: [],
                messages: []
            };
            data.users.push(newUser);
        } else {
            // Find owner to attach to
            // Heuristics for ownership based on Schema
            let ownerId = newItem.userId || newItem.postedBy || newItem.senderId;

            // For Chats, it's shared. We could pick the first member?
            if (collection === 'chats' && newItem.members && newItem.members.length > 0) {
                ownerId = newItem.members[0];
            }

            let foundOwner = false;
            // Iterate users to find the owner
            for (const user of data.users) {
                // Check against profile._id
                if (user.profile && (user.profile._id == ownerId || user.profile.id == ownerId)) {
                    if (!user[collection]) user[collection] = [];
                    user[collection].push(newItem);
                    foundOwner = true;
                    break;
                }
            }

            // Fallback: If no owner found (or global item), maybe add to first admin? 
            // Or just a specific "Orphan" container if we had one. 
            // For now, if no owner, we might fail or push to first user as fallback?
            if (!foundOwner) {
                console.log(`Warning: Could not find owner for ${collection} item. Attaching to first user.`);
                if (data.users.length > 0) {
                    if (!data.users[0][collection]) data.users[0][collection] = [];
                    data.users[0][collection].push(newItem);
                }
            }
        }

        this.save(data);
        return newItem;
    }

    // update(collection, _id, updates) {
    //     const data = this.read();
    //     let updatedItem = null;

    //     if (collection === 'users') {
    //         const userIdx = data.users.findIndex(u => u.profile._id == _id);
    //         if (userIdx !== -1) {
    //             data.users[userIdx].profile = {
    //                 ...data.users[userIdx].profile,
    //                 ...updates,
    //                 updatedAt: new Date().toISOString()
    //             };
    //             updatedItem = data.users[userIdx].profile;
    //         }
    //     } else {
    //         // Search all users for the item
    //         for (const user of data.users) {
    //             if (user[collection]) {
    //                 const idx = user[collection].findIndex(i => i._id == _id);
    //                 if (idx !== -1) {
    //                     user[collection][idx] = {
    //                         ...user[collection][idx],
    //                         ...updates,
    //                         updatedAt: new Date().toISOString()
    //                     };
    //                     updatedItem = user[collection][idx];
    //                     break;
    //                 }
    //             }
    //         }
    //     }

    //     if (updatedItem) {
    //         this.save(data);
    //         return updatedItem;
    //     }
    //     return null;
    // }
    update(collection, _id, updates) {
    const data = this.read();
    let updatedItem = null;
    let found = false;

    // 1. Try ROOT Level First (e.g., data.jobs, data.users)
    if (data[collection] && Array.isArray(data[collection])) {
        
        // Special Case: 'users' collection has a nested .profile structure
        if (collection === 'users') {
            const userIdx = data.users.findIndex(u => u.profile?._id == _id); // Use ?. safely
            if (userIdx !== -1) {
                data.users[userIdx].profile = {
                    ...data.users[userIdx].profile,
                    ...updates,
                    updatedAt: new Date().toISOString()
                };
                updatedItem = data.users[userIdx].profile;
                found = true;
            }
        } 
        // Standard Case: Normal root arrays (e.g., data.jobs)
        else {
            const idx = data[collection].findIndex(item => item._id == _id);
            if (idx !== -1) {
                data[collection][idx] = {
                    ...data[collection][idx],
                    ...updates,
                    updatedAt: new Date().toISOString()
                };
                updatedItem = data[collection][idx];
                found = true;
            }
        }
    }

    // 2. Fallback: Search INSIDE Users (Nested Data)
    // If not found at root, check if it's hidden inside a user (e.g., portfolios)
    if (!found && data.users) {
        for (const user of data.users) {
            // Check if this user has the collection (e.g., user.portfolios)
            if (user[collection] && Array.isArray(user[collection])) {
                const idx = user[collection].findIndex(i => i._id == _id);
                
                if (idx !== -1) {
                    user[collection][idx] = {
                        ...user[collection][idx],
                        ...updates,
                        updatedAt: new Date().toISOString()
                    };
                    updatedItem = user[collection][idx];
                    found = true;
                    break; // Stop loop once found
                }
            }
        }
    }

    if (updatedItem) {
        this.save(data);
        return updatedItem;
    }
    
    return null;
}

    delete(collection, _id) {
        const data = this.read();
        let deleted = false;

        if (collection === 'users') {
            const initialLen = data.users.length;
            data.users = data.users.filter(u => u.profile._id != _id);
            deleted = data.users.length < initialLen;
        } else {
            for (const user of data.users) {
                if (user[collection]) {
                    const initialLen = user[collection].length;
                    user[collection] = user[collection].filter(i => i._id != _id);
                    if (user[collection].length < initialLen) {
                        deleted = true;
                        break;
                    }
                }
            }
        }

        if (deleted) {
            this.save(data);
        }
        return deleted;
    }
}

const mockDb = new MockDb();
export default mockDb;
