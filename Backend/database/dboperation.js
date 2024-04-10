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

async function update_password(email, password) {
    try {
        const user = await Model.User.findOne
        ({ email });
        if (!user) {
            throw new Error('User not found');
        }
        user.password = password;

        await user.save();
    }
    catch (error) {
        throw error;
    }
}

async function deleteLink(email, linkId) {
    try {
        // Find the user by email
        const user = await Model.User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        // Check if the linkId exists in user's userLinks array
        const linkIndex = user.userLinks.findIndex(link => link.linkid === linkId);
        if (linkIndex === -1) {
            throw new Error('Link not found for this user');
        }

        // Remove the link from the user's userLinks array
        user.userLinks.splice(linkIndex, 1);

        // Save the updated user object (with the link removed)
        await user.save();

        // Optionally, you might want to delete the link document from the Links collection
        // Here's how you would do it if linkId corresponds to a Link document
        // This part assumes you have the Link model imported and defined correctly

        await Model.Link.deleteOne({ linkid: linkId }); // If linkId is the ObjectId of the Link document

        // If linkId is a property on the userLinks, it's typically not an ObjectId and this
        // would result in an error. You need to know the shape of your data and use the
        // right property for this.

    } catch (error) {
        throw error;
    }
}

async function publish(email, linkId,Bool) {
    try {
        // Find the user by email
        const user = await Model.User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        // Check if the linkId exists in user's userLinks array
        const linkIndex = user.userLinks.findIndex(link => link.linkid === linkId);
        if (linkIndex === -1) {
            throw new Error('Link not found for this user');
        }
        user.userLinks[linkIndex].published = Bool;

        // Save the updated user object (with the link removed)
        await user.save();
        
        //update the link document
        await   Model.Link.findOneAndUpdate({ linkid: linkId }, { published: Bool });
    }
    catch (error) {
        throw error;
    }
}







module.exports = { user_registration, user_login, get_user, update_password, deleteLink,publish};