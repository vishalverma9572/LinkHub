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
    // adding resetToken
    resetToken: { type: String },
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
  linkid: {
      type: String,
      required: true,
      unique: true
  },
  views: {
      type: Number,
      default: 0
  },
  name: {
      type: String,
      required: true
  },
  published:{
      type: Boolean,
      default: false
  },
  lastupdated: {
      type: Date,
      default: Date.now
  },
  email: String,
  phoneNumber: String,
  bioHtml: String,
  github: String,
  x: String,
  yt: String,
  insta: String,
  // Define the hyperlinks array
  hyperlinks: [{
      name: String,
      url: String
  }],
  
  profileImage: String,
  createdAt: {
      type: Date,
      default: Date.now
  }
});

// Create and export the User and Link models
const User = mongoose.model('User', userSchema);
const Link = mongoose.model('Link', linkSchema);

module.exports = { User, Link };
