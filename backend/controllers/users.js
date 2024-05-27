const User = require('../models/user');
const fs = require('fs');
const { models } = require('../db/mysql');
//utilisation de bcrypt pour crypter le mot de passe
const bcrypt = require('bcrypt');
const File = require('../models/files');
const Pinned_files = require('../models/pinned_files');
const Notification = require("../models/notifications");
const { Op } = require('sequelize');

const err100 = "Error in updating user profile picture";

// error list
const err101 = "Error retrieving user session information from the server.";
const err102 = "Error recovering a user's account";
const err103 = "Error recovering subscriber and subscription accounts";
const err104 = "Error updating user profile to toggle a server-side setting.";
const err105 = "Error updating adult user profile access.";
const err106 = "Error updating user profile name";
const err107 = "Error in updating user profile picture";
const err108 = "Error encountered while updating cover picture.";
const err109 = "Error encountered while updating user email.";
const err110 = "Error encountered while updating user security information.";
const err111 = "Error encountered while updating user private account settings.";
const err112 = "Error encountered while updating user premium account settings.";
const err113 = "Error encountered while updating pinned user.";
const err114 = "Error encountered while fetching pinned users.";
const err115 = "Error encountered while fetching pinned illustrations.";
//...

exports.Get_User_Populars = async (req, res, next) => {
  try {
    // Find all users in the database
    const users = await User.findAll({
      // Define the attributes to retrieve for each user
      attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'isAdmin', 'premium', 'resizeImageUrlCover', 'adultAccess', 'accessPass', 'diamondPass']
    });

    const promise = users;

    // Return the list of users with a status code of 200
    return res.status(200).json({ promise });
  } catch (error) {
    // If an error occurs during the database operation, handle it and return an error response
    console.error('Error in getUserPopulars:', error);
    res.status(500).json({ message: 'Internal Server Error' });

    // Create an error object with a unique ID and error code, and pass it to the error handling middleware
    const err = new Error(err100);
    err.unique_id = 100; // err(100)
    err.error_code = 500;
    return next(err);
  }
};

exports.Get_user_session = async (req, res, next) => {
  try {
    // Find the user in the database by the session user's ID
    const user = await User.findOne({
      where: { id: req.session.user.id }, // Searching by the session user's ID
      attributes: [
        'id',
        'pseudo',
        'imageUrl',
        'imageUrlCover',
        'email',
        'private',
        'isAdmin',
        'isMaster',
        'premium',
        'resizeImageUrlCover',
        'adultAccess',
        'accessPass',
        'coinBuy',
        'coinBack',
        'coinPurchase']
    });

    // If user is not found, return a 404 response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const session = {
      id: user.id,
      email: user.email,
      premium: user.premium,
      isAdmin: user.isAdmin,
      adultAccess: user.adultAccess
    }

    // Update the session user with the updated user information
    req.session.user = session;

    // Save the session
    await req.session.save();

    // Return the user object with a 200 status code
    return res.status(200).json({ user });
  } catch (error) {
    // If an error occurs during the database operation, handle it and return an error response
    console.error('Error in Get_user_session:', error);
    res.status(500).json({ message: 'Internal Server Error' });

    // Create an error object with a unique ID and error code, and pass it to the error handling middleware
    const err = new Error(err101);
    err.unique_id = 101; // err101
    err.error_code = 500;
    return next(err);
  }
};


exports.Get_user_profile = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'premium', 'resizeImageUrlCover', 'total_followers', 'privatePinnedUsers', 'privatePinnedIllustrations', 'caption', 'accessPass', 'diamondPass', 'isAdmin', 'isMaster', 'adultAccess']
    });

    // Return the user profile with adult access set to 0
    return res.status(200).json({ user });
    //}
  } catch (error) {
    // If an error occurs during the database operation, handle it and return an error response
    console.error('Error in Get_user_profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });

    // Create an error object with a unique ID and error code, and pass it to the error handling middleware
    const err = new Error(err102);
    err.unique_id = 102; // err102
    err.error_code = 500;
    return next(err);
  }
};

exports.Get_user_profile_params = async (req, res, next) => {
  try {
    // Find the user profile with additional information if the session user is defined
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'followers', 'isAdmin', 'isMaster', 'adultAccess']
    });

    // If the user is not found, return a 400 status code with an error message
    if (!user) {
      return res.status(400).json({ message: 'Incorrect identification' });
    }

    // Find the session user's profile information
    const MyProfile = await User.findOne({
      where: { id: req.session.user.id },
      attributes: ['followers', 'pinnedUsers']
    });

    // Extract relevant information from the session user's profile and the user profile

    //let profileTable = MyProfile.dataValues.followers != null ? MyProfile.dataValues.followers : [];
    //const followersuserId = profileTable.filter((id) => id == user.dataValues.id);

    let usertable = user.dataValues.followers != null ? user.dataValues.followers : [];
    const userId = usertable.filter((id) => id == req.session.user.id);

    let table = MyProfile.dataValues.pinnedUsers != null ? MyProfile.dataValues.pinnedUsers : [];
    const filteredPinnedUsers = table.filter((id) => id == user.dataValues.id);

    delete user.dataValues.followers;

    // Return the user profile along with additional information
    return res.status(200).json({ user, filteredPinnedUsers, sessionId: req.session.user.id, userId, adultAccess: user.adultAccess });
  } catch (error) {
    // If an error occurs during the database operation, handle it and return an error response
    console.error('Error in Get_user_profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });

    // Create an error object with a unique ID and error code, and pass it to the error handling middleware
    const err = new Error(err102);
    err.unique_id = 102; // err102
    err.error_code = 500;
    return next(err);
  }
};

exports.Get_followers = async (req, res, next) => {
  try {
    // Find the user's followers and users they follow in the database
    const followers = await User.findOne({
      where: { id: req.params.id }, // Searching by the session user's ID
      attributes: [req.params.key]
    });

    //If user is not found, throw an error
    if (!followers) {
      throw new Error('User not found');
    }
    // Find follower users based on the IDs stored in the 'followers' attribute
    const followerUsers = await User.findAll({
      where: { id: followers.dataValues[req.params.key] }, // Searching by the IDs stored in the 'followers' attribute
      attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'resizeImageUrlCover']
    });

    // Return the follower users and users the session user follows with a 200 status code
    return res.status(200).json(followerUsers);
  } catch (error) {
    // If an error occurs during the database operation, handle it and return an error response
    console.error('Error in Get_followers:', error);
    res.status(500).json({ message: 'Internal Server Error' });

    // Create an error object with a unique ID and error code, and pass it to the error handling middleware
    const err = new Error(err103);
    err.unique_id = 103; // err(103)
    err.error_code = 500;
    return next(err);
  }
};

exports.Update_user_profile_toggle = async (req, res, next) => {
  try {
    // Update the user's profile based on the request body, where the user ID matches the session user's ID
    await User.update(req.body, { where: { id: req.session.user.id } });

    // If the update is successful, return a 200 status code with a success message
    return res.status(200).json({ message: 'User changed' });
  } catch (error) {
    // If an error occurs during the update operation, log the error and return a 500 status code with an error message
    console.error('Error in Update_user_profile_toggle:', error);
    res.status(500).json({ message: 'Internal Server Error' });

    // Create an error object with a unique ID and error code, and pass it to the error handling middleware
    const err = new Error(err104);
    err.unique_id = 104; // err(104)
    err.error_code = 500;
    return next(err);
  }
};

exports.Update_user_profile_adult_access = async (req, res, next) => {
  try {
    // Update the user's adultAccess field based on the request body, where the user ID matches the session user's ID
    await User.update({ adultAccess: req.body.adultAccess }, { where: { id: req.session.user.id } });

    // Find the updated user with the latest information
    const updatedUser = await User.findOne({ where: { id: req.session.user.id }, attributes: ['id', 'password', 'email', 'premium', 'adultAccess'] });

    // If the updated user is not found, return a 404 status code with an error message
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the session user with the updated user information
    req.session.user = updatedUser;

    // Save the session
    await req.session.save();

    // Return a 200 status code with a success message
    return res.status(200).json({ message: 'adultAccess changed' });
  } catch (error) {
    // If an error occurs during the update operation, log the error and return a 500 status code with an error message
    console.error('Error in Update_user_profile_adult_access:', error);
    res.status(500).json({ message: 'Internal Server Error' });

    // Create an error object with a unique ID and error code, and pass it to the error handling middleware
    const err = new Error(err105);
    err.unique_id = 105; // err(105)
    err.error_code = 500;
    return next(err);
  }
};


exports.Update_user_profile_name = async (req, res, next) => {
  try {
    // Update the user's username (pseudo) with the new value provided in the request body,
    // where the user ID matches the session user's ID
    await User.update({ pseudo: req.body.pseudo }, { where: { id: req.session.user.id } });

    // Return a 200 status code with a success message
    return res.status(200).json({ message: 'Username changed' });
  } catch (error) {
    // If an error occurs during the update operation, log the error and return a 500 status code with an error message
    console.error('Error in Update_user_profile_name:', error);
    res.status(500).json({ message: 'Internal Server Error' });

    // Create an error object with a unique ID and error code, and pass it to the error handling middleware
    const err = new Error(err106);
    err.unique_id = 106; // err(106)
    err.error_code = 500;
    return next(err);
  }
};

exports.Update_user_profile_picture = async (req, res, next) => {
  try {
    // Determining the URL of the user's image
    const imageUrl = req.file
      ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      : req.body.PrevImage != null && req.body.imageUrl == null
        ? null
        : req.body.imageUrl;

    // Deleting the previous image if it has been modified
    if (req.body.PrevImage != null) {
      const filename = req.body.PrevImage.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => { });
    }

    // Updating the user's information in the database
    await User.update({ ...req.body, imageUrl }, { where: { id: req.session.user.id } });

    // Sending a JSON response indicating that the user has been successfully updated
    return res.status(200).json({ message: 'User changed' });
  } catch (error) {
    console.error('Error in Update_user_profile_picture:', error);
    // If an error occurs, an appropriate error message with an HTTP status of 500 is returned
    res.status(500).json({ message: 'Internal Server Error' });

    // Create an error object with a unique ID and error code, and pass it to the error handling middleware
    const err = new Error(err107);
    err.unique_id = 107; // err(107)
    err.error_code = 500;
    return next(err);
  }
};


exports.Update_cover_picture = async (req, res, next) => {
  try {
    // Building the User Information Object with the Cover Image URL
    const userImg = req.file
      ? {
        ...req.body,
        imageUrlCover: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      }
      : { ...req.body };

    // Checking if the cover image has been changed
    if (userImg.PrevImage && userImg.PrevImage !== userImg.image) {
      // Removing the old cover image
      const filename = userImg.PrevImage.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => { });
    }

    // Updating the user's information in the database
    await User.update(
      { ...userImg, imageUrlCover: userImg.image === 'null' ? null : userImg.imageUrlCover },
      { where: { id: req.session.user.id } }
    );

    // Sending a JSON response indicating that the user has been successfully updated
    return res.status(200).json({ message: 'User changed' });
  } catch (error) {
    console.error('Error in Update_cover_picture:', error);
    // If an error occurs, an appropriate error message with an HTTP status of 500 is returned
    res.status(500).json({ message: 'Internal Server Error' });
    // Create an error object with a unique ID and error code, and pass it to the error handling middleware
    const err = new Error(err108);
    err.unique_id = 108; // err(108)
    err.error_code = 500;
    return next(err);
  }
};


exports.Update_user_email = async (req, res, next) => {
  try {
    // Regular expression to validate the email
    const myRegexEmail = /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/i;

    // Checking if the password is provided
    if (!req.body.password || req.body.password.trim() === '') {
      return res.status(400).json({ message: 'Please provide your password.' });
    }

    // Retrieving the user's password from the database
    const user = await User.findOne({
      where: { id: req.session.user.id },
      attributes: ['password']
    });

    // Checking if the user exists
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    // Comparison of the password provided with the one stored in the database
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect password.' });
    }

    // Checking if the email is provided and if it is valid
    if (!req.body.email || !myRegexEmail.test(req.body.email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    // Updating the user's email in the database
    await User.update({ email: req.body.email }, { where: { id: req.session.user.id } });

    // Sending a JSON response indicating that the email has been updated successfully
    return res.status(200).json({ message: "The user's email has been successfully changed." });

  } catch (error) {
    console.error('Error in Update_user_email:', error);
    // If an error occurs, return an appropriate error message with an HTTP 500 status
    res.status(500).json({ message: 'Internal Server Error' });

    // Create an error object with a unique ID and error code, and pass it to the error handling middleware
    const err = new Error(err109);
    err.unique_id = 109; // err(109)
    err.error_code = 500;
    return next(err);
  }
};


exports.Update_security_user = async (req, res, next) => {
  // Check if all required fields are filled
  if (req.body.newPassword === "" || req.body.newPasswordVerification === "" || req.body.oldPassword === "") {
    return res.status(400).json({ message: 'Please fill in all fields.' });
  }

  // Check if new passwords meet the length requirement
  if (req.body.newPassword.length < 8 || req.body.newPasswordVerification.length < 8) {
    return res.status(400).json({ message: 'The password must contain at least 8 characters.' });
  }

  // Check if the new passwords match
  if (req.body.newPassword !== req.body.newPasswordVerification) {
    return res.status(400).json({ message: 'The verification password does not match the new password.' });
  }

  try {
    // Find the user in the database by their ID
    const user = await User.findOne({
      where: { id: req.session.user.id },
      attributes: ['password']
    });

    // Compare the old password provided with the password stored in the database
    const isPasswordValid = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!isPasswordValid) {
      // If the old password is incorrect, return an error
      return res.status(400).json({ message: 'The old password is incorrect.' });
    }

    // Hash the new password
    const newHash = await bcrypt.hash(req.body.newPassword, 10);

    // Update the user's password in the database
    await User.update({ password: newHash }, { where: { id: req.session.user.id } });

    // Return a success message
    return res.status(200).json({ message: 'User password updated successfully.' });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error in Update_security_user:', error);
    res.status(500).json({ message: 'Internal Server Error' });

    // Create an error object with a unique ID and error code, and pass it to the error handling middleware
    const err = new Error(err110);
    err.unique_id = 110; // err(110)
    err.error_code = 500;
    return next(err);
  }
};


exports.Update_user_private_account = async (req, res, next) => {
  try {
    // Update the 'private' field for the user in the database
    User.update({ private: req.body.private }, { where: { id: req.session.user.id } })
      .then(() => {
        // If the update is successful, return a success message
        return res.status(200).json({ message: 'User privacy setting updated successfully.' });
      })
  } catch (error) {
    // If an error occurs during the update process, handle it and return an error response
    console.error('Error in Update_user_private_account:', error);
    res.status(500).json({ message: 'Internal Server Error' });

    // Create an error object with a unique ID and error code, and pass it to the error handling middleware
    const err = new Error(err111);
    err.unique_id = 111; // err(111)
    err.error_code = 500;
    return next(err);
  }
};

exports.Update_user_premium_account = async (req, res, next) => {
  try {
    // Update the 'premium' field for the user in the database
    User.update({ premium: req.body.premium }, { where: { id: req.session.user.id } })
      .then(() => {
        // If the update is successful, return a success message
        return res.status(200).json({ message: 'User premium status updated successfully.' });
      })
  } catch (error) {
    // If an error occurs during the update process, handle it and return an error response
    console.error('Error in Update_user_premium_account:', error);
    res.status(500).json({ message: 'Internal Server Error' });

    // Create an error object with a unique ID and error code, and pass it to the error handling middleware
    const err = new Error(err112);
    err.unique_id = 112; // err(112)
    err.error_code = 500;
    return next(err);

  }
};
exports.Update_user_accessPass = async (req, res, next) => {
  try {
    // Update the 'premium' field for the user in the database
    User.update({ accessPass: req.body.accessPass }, { where: { id: req.session.user.id } })
      .then(() => {
        // If the update is successful, return a success message
        return res.status(200).json({ message: 'User premium status updated successfully.' });
      })
  } catch (error) {
    // If an error occurs during the update process, handle it and return an error response
    console.error('Error in Update_user_premium_account:', error);
    res.status(500).json({ message: 'Internal Server Error' });

    // Create an error object with a unique ID and error code, and pass it to the error handling middleware
    const err = new Error(err112);
    err.unique_id = 112; // err(112)
    err.error_code = 500;
    return next(err);

  }
};

exports.Update_pinned_user = async (req, res, next) => {
  try {
    // Find the user in the database
    const user = await User.findOne({ where: { id: req.session.user.id } });

    // Retrieve the current pinned users array from the user data, or initialize an empty array if it's null
    let pinnedUsers = user.dataValues.pinnedUsers != null ? user.dataValues.pinnedUsers : [];

    // Check if the requested pinned user ID is already in the pinned users array
    const filteredUsers = pinnedUsers.filter((id) => id == req.body.pinnedUsers);

    // If the requested pinned user ID is already in the array, remove it
    if (parseInt(filteredUsers) == req.body.pinnedUsers) {
      const filtered = pinnedUsers.filter((id) => id != req.body.pinnedUsers);
      await User.update({ pinnedUsers: filtered }, { where: { id: req.session.user.id } });
    } else {
      // If the requested pinned user ID is not in the array, add it
      const unique = Array.from(new Set([...pinnedUsers, req.body.pinnedUsers]));
      await User.update({ pinnedUsers: unique }, { where: { id: req.session.user.id } });
    }

    // Return a success message with a status code of 200
    return res.status(200).json({ message: "The user's pinned users have been successfully updated" });
  } catch (error) {
    // If an error occurs during the database operation, handle it and return an error response
    console.error('Error in Update_pinned_user:', error);
    res.status(500).json({ message: 'Internal Server Error' });

    // Create an error object with a unique ID and error code, and pass it to the error handling middleware
    const err = new Error(err113);
    err.unique_id = 113; // err(113)
    err.error_code = 500;
    return next(err);
  }
};

exports.get_user_pinned = async (req, res, next) => {
  try {
    // Find the user in the database by ID
    const user = await User.findOne({ where: { id: req.params.id } });

    // If user is not found, return a 400 response indicating no pinned users were found
    if (!user) {
      return res.status(400).json({ message: 'No pinned users found for the specified user' });
    }

    // Retrieve the pinned users array from the user data
    const pinnedUserIds = user.dataValues.pinnedUsers;

    // If there are no pinned users, return a 400 response indicating no pinned users were found
    if (!pinnedUserIds) {
      return res.status(400).json({ message: 'No pinned users found for the specified user' });
    }


    if (req.session.user.id === parseInt(req.params.id)) {
      // Find all pinned users using their IDs
      const pinnedUsers = await User.findAll({
        where: { id: pinnedUserIds },
        attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'isAdmin', 'premium', 'resizeImageUrlCover', 'adultAccess', 'accessPass', 'diamondPass']
      });

      const promise = pinnedUsers;

      if (pinnedUserIds.length !== pinnedUsers.length) {
        const clearPinnedUsers = pinnedUsers.map((el) => el.id)
        await User.update({ pinnedUsers: clearPinnedUsers }, { where: { id: req.params.id } });
      }

      // Return the pinned users with a 200 status code
      return res.status(200).json({ promise: promise });
    } else {
      if (user.privatePinnedUsers) {
        return res.status(403).json({ message: 'private' });
      }
      // Find all pinned users using their IDs
      const pinnedUsers = await User.findAll({
        where: { id: pinnedUserIds },
        attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'isAdmin', 'premium', 'resizeImageUrlCover', 'adultAccess']
      });

      const promise = pinnedUsers;
      if (pinnedUserIds.length !== pinnedUsers.length) {
        const clearPinnedUsers = pinnedUsers.map((el) => el.id)
        await User.update({ pinnedUsers: clearPinnedUsers }, { where: { id: req.params.id } });
      }

      // Return the pinned users with a 200 status code
      return res.status(200).json({ promise: promise });
    }

  } catch (error) {
    // If an error occurs during the database operation, handle it and return an error response
    console.error('Error in get_user_pinned:', error);
    res.status(500).json({ message: 'Internal Server Error' });

    // Create an error object with a unique ID and error code, and pass it to the error handling middleware
    const err = new Error(err114);
    err.unique_id = 114; // err(114)
    err.error_code = 500;
    return next(err);
  }
};

exports.Get_illustration_pinned = async (req, res, next) => {
  try {
    // Find the user in the database by ID
    const user = await User.findOne({ where: { id: req.params.id } });

    // If user is not found, return a 400 response indicating no pinned users were found
    if (!user) {
      return res.status(400).json({ message: 'No pinned users found for the specified user' });
    }



    const whereParams = req.session.user !== undefined ?
      req.session.user.adultAccess ?
        { visibility: 1 }
        :
        { visibility: 1, adult: 0 }
      :
      { visibility: 1, adult: 0 };


    if (req.session.user.id === parseInt(req.params.id)) {
      // Find all bookmarked illustrations using their IDs
      const pinnedIllustrations = await Pinned_files.findAll({
        where: { userId: req.params.id },
        attributes: ['id'],
        include: [{
          model: models.files, attributes: ['id', 'name', 'type', 'miniature', 'groupId', 'adult', 'createdAt', 'ai', 'imagesCount', 'adminId', 'shop', 'diamond'],
          where: whereParams,
          include: { model: models.users, attributes: ['id', 'pseudo', 'imageUrl'] }
        }],
        order: [['createdAt', 'DESC']]
      });


      const promise = pinnedIllustrations;

      // Return the bookmarked illustrations with a 200 status code
      return res.status(200).json({ promise });
    } else {
      if (user.privatePinnedIllustrations) {
        return res.status(403).json({ message: 'private' });
      }
      // Find all bookmarked illustrations using their IDs
      const pinnedIllustrations = await Pinned_files.findAll({
        where: { userId: req.params.id },
        attributes: ['id'],
        include: [{
          model: models.files, attributes: ['id', 'name', 'type', 'miniature', 'groupId', 'adult', 'createdAt', 'ai', 'imagesCount', 'adminId', 'shop', 'diamond'],
          where: whereParams,
          include: { model: models.users, attributes: ['id', 'pseudo', 'imageUrl'] }
        }],
        order: [['createdAt', 'DESC']]
      });


      const promise = pinnedIllustrations;

      // Return the bookmarked illustrations with a 200 status code
      return res.status(200).json({ promise });
    }

  } catch (error) {
    // If an error occurs during the database operation, handle it and return an error response
    console.error('Error in Get_illustration_pinned:', error);
    res.status(500).json({ message: 'Internal Server Error' });

    // Create an error object with a unique ID and error code, and pass it to the error handling middleware
    const err = new Error(err115);
    err.unique_id = 115; // err(115)
    err.error_code = 500;
    return next(err);
  }
};