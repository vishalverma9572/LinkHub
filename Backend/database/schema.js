const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    password: {
        type: String,
        required: true
    },
    userLinks: [{
        linkid: {
            type: String,
            required: true
          },
          views: {
            type: Number,
            default: 0
          },
          published: {
            type: Boolean,
            default: false
          },
          name: {
            type: String
          },
          lastupdated: {
            type: Date,
            default: Date.now // Set default value to current date/time
          }
    }]
    
});

// Define the Link schema
const linkSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    description: {
        type: Schema.Types.Mixed // Use Schema.Types.Mixed for arbitrary JSON data
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the User and Link models
const User = mongoose.model('User', userSchema);
const Link = mongoose.model('Link', linkSchema);

module.exports = { User, Link };
