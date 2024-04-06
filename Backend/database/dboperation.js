const Model = require('./schema');

async function user_registration(name, email, password) {
    try {
        // Check if the email already exists in the database
        const existingUser = await Model.User.findOne({ email });

        if (existingUser) {
            // Email already exists, return an error
            return { error: 'Email already exists' };
        }

        // Email doesn't exist, create a new user
        const newUser = new Model.User({ name, email, password });
        const user = await newUser.save();

        return user;
    } catch (error) {
        // Handle any errors that occur during the registration process
        // console.error('Registration error:', error);
        throw error; // Propagate the error to the caller
    }
}
  

async function user_login(email, password) {
    try {
        const user = await Model.User.findOne({ email:`${email}`, password:`${password}` }).exec();
        if (!user) {
            throw new Error('Invalid email or password');
        }
        return user;
    } catch (error) {
        // console.error('Error logging in user:', error);
        throw error;
    }
}

async function get_user(email) {
    try {
        // Find the user by email and exclude the password field from the query result
        const user = await Model.User.findOne({ email }).select('-password -_id -__v').exec();

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        throw error;
    }
}


module.exports = { user_registration, user_login, get_user };