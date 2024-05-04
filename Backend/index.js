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
const update_password=db.update_password;
const deleteLink=db.deleteLink;
const publishLink=db.publish;
const createLink=db.postnewLink;
const updateLink=db.updateLink;
const getLink=db.getLink;
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
app.get('/get-link/:linkId', async (req, res) => {
  
  const linkId = req.params.linkId;
  console.log(linkId);

 
  try {
    // Call the deleteLink function asynchronously
    const link = await getLink( linkId);
    console.log('Link fetched successfully');
    res.status(200).json({ status: 'success', content: link });

  } catch (error) {
    // Handle link deletion errors
    console.error('Link deletion error:', error);
    res.status(400).json({ status: 'failed', error: error.message });
  }
}
);
app.use(authenticate);

app.get('/dashboard', async (req, res) => {
  const email = req.user.email;
  const user = await get_user(email);
  if (!user) {
    return res.status(404).json({ status: 'failed', error: 'User not found' });
  }
  res.status(200).json({ status: 'success', user: user });

  
});

app.put('/update-password', async (req, res) => {
  const email = req.user.email;
  const { newPassword } = req.body;

  try {
    // Call the update_password function asynchronously
    await update_password(email, newPassword);
    console.log('Password updated successfully');
    res.status(200).json({ status: 'success', message: 'Password updated successfully' });

  } catch (error) {
    // Handle password update errors
    console.error('Password update error:', error);
    res.status(400).json({ status: 'failed', error: error.message });
  }
});

app.delete('/delete-link/:linkId', async (req, res) => {
  const email = req.user.email;
  const linkId = req.params.linkId;
  console.log(email, linkId);
  try {
    // Call the deleteLink function asynchronously
    await deleteLink(email, linkId);
    console.log('Link deleted successfully');
    res.status(200).json({ status: 'success', message: 'Link deleted successfully' });

  } catch (error) {
    // Handle link deletion errors
    console.error('Link deletion error:', error);
    res.status(400).json({ status: 'failed', error: error.message });
  }
});  

app.put('/publish-link/:linkId', async (req, res) => {
  const email = req.user.email;
  const linkId = req.params.linkId;
  console.log(email, linkId);
  try {
    // Call the deleteLink function asynchronously
    await publishLink(email, linkId,true);
    console.log('Link published successfully');
    res.status(200).json({ status: 'success', message: 'Link published successfully' });

  } catch (error) {
    // Handle link deletion errors
    console.error('Link deletion error:', error);
    res.status(400).json({ status: 'failed', error: error.message });
  }
});

app.put('/unpublish-link/:linkId', async (req, res) => {
  const email = req.user.email;
  const linkId = req.params.linkId;
  console.log(email, linkId);
  try {
    // Call the deleteLink function asynchronously
    await publishLink(email, linkId,false);
    console.log('Link unpublished successfully');
    res.status(200).json({ status: 'success', message: 'Link unpublished successfully' });

  } catch (error) {
    // Handle link deletion errors
    console.error('Link deletion error:', error);
    res.status(400).json({ status: 'failed', error: error.message });
  }
});


app.post('/create-link', async (req, res) => {
  const email = req.user.email;
  let jsonData;
  //parsing request body to json to get data
  if (typeof req.body === 'string') {
    // Parse the string to JSON object
     jsonData = JSON.parse(req.body);

    // Now `jsonData` is a JavaScript object representing the parsed JSON data
    console.log('Parsed JSON data:', jsonData);
  }
  else{
     jsonData=req.body;
  }

  console.log(jsonData);
  console.log(email, jsonData);

  try {
    // Call the createLink function asynchronously
    const link = await createLink(email,jsonData);

    if (link.error) {
      // If createLink returns an error, send a failed response
      res.status(400).json({ status: 'failed', error: link.error });
    } else {
      // Link creation successful, send a success response with the link object
      res.status(200).json({ status: 'success', link: link });
    }
  } catch (error) {
    // Handle link creation errors
    console.error('Link creation error:', error);
    res.status(400).json({ status: 'failed', error: error.message });
  }

});
app.put('/update-link', async (req, res) => {
  const email = req.user.email;
  
  let jsonData;
  //parsing request body to json to get data
  if (typeof req.body === 'string') {
    // Parse the string to JSON object
     jsonData = JSON.parse(req.body);

    // Now `jsonData` is a JavaScript object representing the parsed JSON data
    console.log('Parsed JSON data:', jsonData);
  }
  else{
     jsonData=req.body;
  }

  console.log(jsonData);
  console.log(email, jsonData);

  try {
    // Call the createLink function asynchronously
    const link = await updateLink(email,jsonData);

    if (link.error) {
      // If createLink returns an error, send a failed response
      res.status(400).json({ status: 'failed', error: link.error });
    } else {
      // Link creation successful, send a success response with the link object
      res.status(200).json({ status: 'success', link: link });
    }
  } catch (error) {
    // Handle link creation errors
    console.error('Link creation error:', error);
    res.status(400).json({ status: 'failed', error: error.message });
  }

}
);



app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});