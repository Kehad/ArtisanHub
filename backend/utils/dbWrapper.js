import mockDb from './mockDb.js';

/**
 * A wrapper to handle switching between real Mongoose models and the Mock DB.
 * If the real model fails or is not connected, it falls back to Mock DB.
 */
export const dbWrapper = {
    find: async (model, collection, query = {}) => {
        try {
            if (model && model.db && model.db.readyState === 1 && model.find) {
                return await model.find(query).sort({ createdAt: -1 });
            }
        } catch (e) {
            console.log(`Falling back to dummy ${collection} search`);
        }
        const results = mockDb.find(collection, query);
        return results;
        // Sort by createdAt desc by default
        // return results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    findOne: async (model, collection, query = {}) => {
        try {
            if (model && model.db && model.db.readyState === 1 && model.findOne) {
                const item = await model.findOne(query);
                if (item) return item;
            }
        } catch (e) {
            console.log(`Falling back to dummy ${collection} lookup`);
        }
        return mockDb.findOne(collection, query);
    },

    findById: async (model, collection, id) => {
        try {
            if (model && model.db && model.db.readyState === 1 && model.findById) {
                const item = await model.findById(id);
                console.log('item dbwrapper', item);
                if (item) return item;
            }
        } catch (e) {
            console.log(`Falling back to dummy ${collection} by ID`);
        }
        return mockDb.findOne(collection, { id });
    },

    create: async (model, collection, data) => {
        try {
            if (model && model.db && model.db.readyState === 1) {
                const newItem = new model(data);
                return await newItem.save();
            }
        } catch (e) {
            console.log(`Saving to dummy ${collection} instead`);
        }
        return mockDb.insert(collection, data);
    },

    update: async (model, collection, id, updates) => {
        try {
            if (model && model.db && model.db.readyState === 1 && model.findByIdAndUpdate) {
                const item = await model.findByIdAndUpdate(
                    id,
                    { $set: updates },
                    { new: true }
                );
                if (item) return item;
            }
        } catch (e) {
            console.log(`Updating in dummy ${collection}`);
        }
        // In dummy mode, we might use 'id' as a string or MongoDB ObjectId string
        return mockDb.update(collection, id, updates);
    },

    delete: async (model, collection, id) => {
        try {
            if (model && model.db && model.db.readyState === 1 && (model.findByIdAndRemove || model.findByIdAndDelete)) {
                const fn = model.findByIdAndDelete || model.findByIdAndRemove;
                await fn(id);
                return true;
            }
        } catch (e) {
            console.log(`Deleting from dummy ${collection}`);
        }
        return mockDb.delete(collection, id);
    }
};

export default dbWrapper;
