const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = require("./schema");

const connections = new Map();
const mongoDBConnectionString = process.env.MONGODB_URI;
let isCleanupRegistered = false;

const connect = function({ table, schema }) {
    return new Promise((resolve, reject) => {
        if (connections.has(table)) {
            return resolve(connections.get(table));
        }

        const db = mongoose.createConnection(mongoDBConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 5,
        });

        const timeoutId = setTimeout(() => {
            reject(new Error('Connection timeout'));
        }, 10000);

        db.on('error', (err) => {
            clearTimeout(timeoutId);
            connections.delete(table);
            reject(err);
        });

        db.once('open', () => {
            clearTimeout(timeoutId);
            try {
                const model = db.model(table, schema);
                connections.set(table, model);
                
                // Register cleanup only once
                if (!isCleanupRegistered) {
                    registerCleanup();
                    isCleanupRegistered = true;
                }
                
                resolve(model);
            } catch (error) {
                connections.delete(table);
                db.close();
                reject(error);
            }
        });
    });
};

// Register cleanup handlers once
function registerCleanup() {
    const cleanup = async () => {
        const closePromises = Array.from(connections.values()).map(model => {
            if (model.db && model.db.readyState === 1) {
                return model.db.close();
            }
        });
        
        await Promise.all(closePromises.filter(Boolean));
        connections.clear();
        console.log('All database connections closed');
        process.exit(0);
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
}

const registerUser = async function(userData) {
    try {
        if (!userData || !userData.firstName || !userData.password) {
            throw new Error(`Username and password are required`);
        }

        if (userData.password !== userData.password2) {
            throw new Error('Passwords do not match');
        }

        // Get or create User model
        const User = await connect({ 
            table: 'User', 
            schema: userSchema 
        });

        // Hash password
        const hash = await bcrypt.hash(userData.password, 10);
        userData.password = hash;
        
        // Remove password2 before saving
        delete userData.password2;

        // Create and save user
        const newUser = new User(userData);
        await newUser.save();         
        return `User ${userData.fullName} successfully registered`;
        
    } catch (err) {
        if (err.code === 11000) {
            throw new Error('User Name already taken');
        } else {
            throw new Error(`There was an error creating the user: ${err.message}`);
        }
    }
};

const checkUser = async function(userData) {
    try {
        if (!userData || !userData.email || !userData.password) {
            throw new Error('Username and password are required');
        }

        const User = await connect({ 
            table: 'User', 
            schema: userSchema 
        });

        // Find user
        const user = await User.findOne({ email: userData.email }).exec(); 

        if (!user) {
            throw new Error(`Unable to find user ${userData.userName}`);
        }

        // Compare password
        const isMatch = await bcrypt.compare(userData.password, user.password);
        
        if (!isMatch) {
            throw new Error(`Incorrect password for user ${userData.userName}`);
        }

        // Return user without password
        const userObj = user.toObject();
        delete userObj.password;
        return userObj;
        
    } catch (err) {
        throw err;
    }
};

const getUser = async function(userID) {
    const User = await connect({
        table: 'User',
        schema: userSchema
    });

    try {
        const objectId = new mongoose.Types.ObjectId(userID);
        
        const user = await User.findById(objectId)
            .select('-password -__v') // exclude password and version key
            .lean(); // return plain JS object
        
        return user;
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        throw err;
    }
};

// Utility function to get User model directly
const getUserModel = function() {
    return connect({ 
        table: 'User', 
        schema: userSchema 
    });
};

// Export all functions for Next.js
module.exports = {
    connect,
    registerUser,
    checkUser,
    getUser,
    getUserModel,
    userSchema
};