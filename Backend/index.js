const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { User, Link } = require('./database/schema');
const cors = require('cors');
const app = express();
const port = 4500;
const db=require('./database/dboperation');
const user_registration=db.user_registration;
const user_login=db.user_login;
const get_user=db.get_user;
const authenticate = require('./Authenticate/authenticate').authenticate;
const generateToken = require('./Authenticate/authenticate').generateToken;
mongoose.connect('mongodb://127.0.0.1:27017/linkhub', {
  // connection options (if any)
});




app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    try {
        // Call the user_registration function asynchronously
        const user = await db.user_registration(name, email, password);

        if (user.error) {
            // If user_registration returns an error, send a failed response
            res.status(400).json({ status: 'failed', error: user.error });
        } else {
            // Registration successful, send a success response with the user object
            res.status(200).json({ status: 'success', user: user });
        }
    } catch (error) {
        // Handle registration errors
        console.error('Registration error:', error);
        res.status(400).json({ status: 'failed', error: error.message });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Call the user_login function asynchronously
        const user = await user_login(email, password);
        const token = generateToken(email);
        // If user_login succeeds, send a success response with the user object
        res.status(200).json({status: 'success', token:token});
    } catch (error) {
        // If user_login fails, send an error response
        console.error('Login error:', error);
        res.status(401).json({status:'failed', error: 'Invalid credentials' });
    }
});


//secure route

app.use(authenticate);

app.get('/dashboard', async (req, res) => {
  const email = req.user.email;
  const user = await get_user(email);
  if (!user) {
    return res.status(404).json({ status: 'failed', error: 'User not found' });
  }
  res.status(200).json({ status: 'success', user: user });

  
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});