const { get } = require('mongoose');
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

async function getLink(linkId) {
    try {
        const link = await Model.Link.findOne({ linkid:linkId }).exec();
        if (!link) {
            throw new Error('Link not found');
        }
        return link;
    } catch (error) {
        throw error;
    }
}


async function postnewLink(email, data1) {
    try {
        // Validate input data
        if (!email || !data1) {
            throw new Error('Email and data are required');
        }

        // Find the user by email
        const user = await Model.User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        // Check if the linkid already exists for the user
        const linkExists = user.userLinks.some(link => link.linkid === data1.linkid);
        if (linkExists) {
            throw new Error('Link already exists');
        }

        // Create a new Link document
        const newLink = new Model.Link(data1);
        
        // Create a userLink object to push into the user's userLinks array
        const userLinkObject = {
            linkid: data1.linkid,
            views: 0,
            published: false,
            name: data1.name,
            // linkName: data1.alias,
            lastupdated: new Date()
        };
        console.log(userLinkObject)

        // Push the userLinkObject into the user's userLinks array
        user.userLinks.push(userLinkObject);

        // Save the new Link document and update the user
        await newLink.save();
        await user.save();

        // Return the newly created link or any other result as needed
        return newLink; // You can modify the return value based on your use case
    } catch (error) {
        console.error('Error creating new link:', error.message);
        throw error;
    }
}

async function updateLink(email, data1) {
    try {
        // Validate input data
        if (!email || !data1) {
            throw new Error('Email and data are required');
        }

        // Find the user by email
        const user = await Model.User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        // Check if the linkid already exists for the user
        const linkIndex = user.userLinks.findIndex(link => link.linkid === data1.linkid);
        if (linkIndex === -1) {
            throw new Error('Link not found for this user');
        }

        // Update the existing link in the user's userLinks array
        const userLinkObject = user.userLinks[linkIndex];
        userLinkObject.name = data1.name;
        userLinkObject.lastupdated = new Date();
        userLinkObject.published = data1.published;
        userLinkObject.views = data1.views;

        // Save the updated user document (user)
        await user.save();

        // Optionally, update the link document in the Link collection
        const updatedLink = await Model.Link.findOneAndUpdate(
            { linkid: data1.linkid },
            { $set: data1 },
            { new: true } // Set { new: true } to return the updated document
        );

        // Handle cases where the updatedLink is null (if not found or other errors)
        if (!updatedLink) {
            throw new Error('Link not found or unable to update');
        }

        // Return the updated link or any other result as needed
        return updatedLink;
    } catch (error) {
        console.error('Error updating link:', error.message);
        throw error;
    }
}

//view link for public use
async function viewLink(linkId) {
    try {
        // Find the link by linkId
        const link = await Model.Link.findOne({ linkid: linkId }).exec();
        
        if (!link) {
            throw new Error('Link not found');
        }

        if (link.published === false) {
            throw new Error('Link not published');
        }

        // Increment the views count for the link
        link.views += 1;
        await link.save();

        // Find the user associated with this link
        const user = await Model.User.findOne({ "userLinks.linkid": linkId }).exec();
        
        if (!user) {
            throw new Error('User not found');
        }

        // Find the specific userLink for the given linkId
        const userLink = user.userLinks.find(ul => ul.linkid === linkId);
        
        if (!userLink) {
            throw new Error('UserLink not found');
        }

        // Increment the views count for the userLink
        userLink.views += 1;
        await user.save();

        // Return the updated link
        return link;
    } catch (error) {
        throw error; // Rethrow the error to propagate it up
    }
}









module.exports = { user_registration, user_login, get_user, update_password, deleteLink,publish,postnewLink,updateLink,getLink,viewLink};