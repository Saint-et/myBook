const File = require('../models/files');
const Posts = require('../models/post');
const User = require('../models/user');
const { models } = require('../db/mysql');
const { Op, Sequelize } = require('sequelize');
const natural = require('natural');
const Pinned_files = require('../models/pinned_files');


exports.GetIllustrationfile = async (req, res, next) => {

    const whereParams = req.session.user !== undefined ?
        req.session.user.adultAccess ?
            { id: req.params.id, type: req.params.key, visibility: 1 }
            :
            { id: req.params.id, type: req.params.key, visibility: 1, adult: 0 }
        :
        { id: req.params.id, type: req.params.key, visibility: 1, adult: 0 };


    try {
        await File.findOne({
            where: whereParams,
            attributes: [
                'id',
                'name',
                'type',
                'visibility',
                'miniature',
                'imagesCount',
                'adminId',
                'comments',
                'groupId',
                'adult',
                'tags',
                'ai',
                'allowUserEditTag',
                'viewUsers',
                'view',
                'shop',
                'diamond',
                'price'
            ],
            include: [
                {
                    model: models.images, attributes: ['id', 'imageUrl', 'limited', 'caption', 'order'],
                    where: {
                        [Op.or]: [
                            { limited: 0 },
                            { limited: 1 },
                            { limited: 2 }
                        ]
                    },
                    required: false
                },
                { model: models.users, attributes: ['id', 'pseudo', 'imageUrl'] },
                { model: models.groupsfiles, attributes: ['id', 'name', 'imageUrl', 'data'] }
            ],
            order: [
                [models.images, 'order', 'asc']
            ]
        })
            .then(async (promise) => {
                if (!promise) {
                    // Handle error if file search page no longer exists
                    return res.status(403).json("The search page no longer exists or access is denied.");
                }
                if (req.session.user === undefined) {
                    // Respond to the request
                    return res.status(200).json(promise);
                }
                let view1 = promise.view;
                if (promise.viewUsers === undefined || promise.view === undefined) {
                    res.status(200).json(promise);
                    const err = new Error('The number of views and missing views per user (illustration, Manga... page), {promise.viewUsers: undefined > ARRAY, promise.view: undefined > NUMBER}.');
                    err.unique_id = 501; // ERR_HISTORICAL(501)
                    err.error_code = 500;
                    return next(err);
                }
                if (promise.viewUsers.length === 0) {
                    // If viewUsers is empty, add a new entry and update the database
                    try {
                        const build = {
                            viewUsers: [{ userId: req.session.user.id, date: Date.now(), view: 1 }],
                            view: view1 + 1
                        };
                        await File.update(build, { where: { id: req.params.id } });
                    } catch (error) {
                        res.status(500).json({ message: 'Internal Server Error' });
                        const err = new Error('The number of views and missing views per user (illustration, Manga... page), {promise.viewUsers: undefined > ARRAY}.');
                        err.unique_id = 502; // ERR_HISTORICAL(502)
                        err.error_code = 500;
                        return next(err);
                    }
                } else {
                    // Search for the user in viewUsers
                    let user = promise.viewUsers.find((el) => el.userId === req.session.user.id);
                    if (!user) {
                        try {
                            // If user not found, add a new entry and update the database
                            const build = {
                                viewUsers: [{ userId: req.session.user.id, date: Date.now(), view: 1 }, ...promise.viewUsers],
                                view: view1 + 1
                            };
                            await File.update(build, { where: { id: req.params.id } });
                        } catch (error) {
                            res.status(500).json({ message: 'Internal Server Error' });
                            const err = new Error('The number of views and missing views per user (illustration, Manga... page), {Adding a new user + a view}.');
                            err.unique_id = 503; // ERR_HISTORICAL(503)
                            err.error_code = 500;
                            return next(err);
                        }
                    } else {
                        // If user found, check the elapsed time since their last visit
                        const oneHour = 60 * 60 * 1000; // One hour in milliseconds
                        const elapsedTime = Date.now() - user.date;
                        if (elapsedTime >= oneHour) {
                            try {
                                // If one hour has passed, update data and database
                                let arrayUserViewsFilter = promise.viewUsers.filter((el) => el.userId !== req.session.user.id);
                                let view1 = promise.view || 0;
                                const build = {
                                    viewUsers: [{ userId: req.session.user.id, date: Date.now(), view: user.view + 1 || 1 }, ...arrayUserViewsFilter],
                                    view: view1 + 1
                                };
                                await File.update(build, { where: { id: req.params.id } });
                            } catch (error) {
                                res.status(500).json({ message: 'Internal Server Error' });
                                const err = new Error('The number of views and missing views per user (illustration, Manga... page), {update a user + a view}.');
                                err.unique_id = 504; // ERR_HISTORICAL(504)
                                err.error_code = 500;
                                return next(err);
                            }
                        }
                    }
                }

                // Remove viewUsers and view properties from the response
                delete promise.dataValues.viewUsers;
                delete promise.dataValues.view;

                // Respond to the request
                return res.status(200).json(promise);
            })
    } catch (error) {
        // Handle error if file search page no longer exists
        return res.status(403).json("The search page no longer exists or access is denied.");
    }
};

exports.GetParamsfiles = async (req, res, next) => {
    const whereParams = req.session.user !== undefined ?
        req.session.user.adultAccess ?
            { id: req.params.id, type: req.params.key, visibility: 1 }
            :
            { id: req.params.id, type: req.params.key, visibility: 1, adult: 0 }
        :
        { id: req.params.id, type: req.params.key, visibility: 1, adult: 0 };

    try {
        // Search for the file
        const file = await File.findOne({
            where: whereParams,
            attributes: ['bookMarks', 'view', 'dateRework', 'createdAt', 'name', 'data', 'dataDescription']
        });
        // If file is not found, return 404 error
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        if (req.session.user === undefined) {
            // Send the response
            return res.status(200).json({ file: file });
        }

        try {
            // Search for the pinned file
            const filePinned = await Pinned_files.findOne({
                where: { fileId: req.params.id, userId: req.session.user.id }, // Look for the pinned file with the specified fileId
                attributes: ['fileId'] // Only retrieve the fileId attribute
            });

            // Construct the response JSON
            const response = {
                file: file, // Include the original file information
                BookmarksId: filePinned ? filePinned.fileId : null // If a pinned file was found, include its fileId; otherwise, set it to null
            };

            // Send the response
            return res.status(200).json(response);
        } catch (error) {
            // Handle any errors that occur during the search process
            console.error('Error:', error); // Log the error to the console for debugging purposes
            return res.status(500).json({ message: 'Internal Server Error' }); // Return an internal server error response
        }

    } catch (error) {
        // Handle internal server error
        res.status(500).json({ message: 'Internal Server Error' });
        const err = new Error('Get Book marks missing (illustration, Manga... page).');
        err.unique_id = 505; // ERR_HISTORICAL(505)
        err.error_code = 500;
        return next(err);
    }
};

exports.newBookMark = async (req, res, next) => {
    try {
        // Find the user
        await Pinned_files.findOne({
            where: { fileId: req.params.id, userId: req.session.user.id },
            attributes: ['id']
        }).then(async (user) => {

            // Define some variables
            const test = 0;
            const test1 = 1;

            // Check if the file is already bookmarked by the user
            if (user) {
                await Pinned_files.destroy({ where: { fileId: req.params.id, userId: req.session.user.id } })
                    .then(async () => {
                        try {
                            File.update(
                                { bookMarks: Sequelize.literal(`GREATEST(COALESCE(bookMarks, ${test}) - ${test1}, ${test})`) },
                                { where: { id: req.body.groupId } }
                            )
                                .then(() => {
                                    // Return success message
                                    return res.status(200).json({ message: "The user's pinned has successfully changed" });
                                })
                        } catch (error) {
                            // Handle error
                            res.status(500).json({ message: 'Internal Server Error' });
                            const err = new Error('Book marks remove (illustration, Manga... page), {remove a Book marks}.');
                            err.unique_id = 506; // ERR_HISTORICAL(506)
                            err.error_code = 500;
                            return next(err);
                        }
                    })
                    .catch(() => { return res.status(500).json({ message: 'Error deleting bookmark.' }) })
            } else {
                // If the file is not already bookmarked by the user
                const build = Pinned_files.build({
                    userId: req.session.user.id,
                    fileId: req.params.id
                })

                build.save()
                    .then(async () => {
                        try {
                            File.update(
                                { bookMarks: Sequelize.literal(`COALESCE(bookMarks, ${test}) + ${test1}`) },
                                { where: { id: req.body.groupId } }
                            )
                                .then(() => {
                                    console.log('Number of bookMarks updated successfully.');
                                    // Return success message
                                    return res.status(200).json({ message: "The user's pinned has successfully changed" });
                                })
                        } catch (error) {
                            return res.status(500).json({ message: 'Error updating bookmark file pin.' });
                        }
                    })
                    .catch(() => { return res.status(500).json({ message: 'Error creating bookmark.' }) })
            }
        })
    } catch (error) {
        // Handle error
        res.status(500).json({ message: 'Internal Server Error' });
        const err = new Error('Book marks missing (illustration, Manga... page), {adding or remove a Book marks}.');
        err.unique_id = 508; // ERR_HISTORICAL(508)
        err.error_code = 500;
        return next(err);
    }
}

exports.updateTags = async (req, res, next) => {
    try {
        // Parse the JSON array of tags from the request body
        const jsonArray = JSON.parse(req.body.tags);
        // Update the tags of the file with the given ID
        File.update({ tags: jsonArray }, { where: { id: req.params.id } })
            .then(() => {
                // Return success message if the update is successful
                return res.status(200).json({ message: "Tags have been successfully changed" });
            })
    } catch (error) {
        // Handle error if there's an issue parsing the JSON or any other internal error
        res.status(500).json({ message: 'Internal Server Error' });
        const err = new Error('update tags fail (illustration, Manga... page), {Verify user data}.');
        err.unique_id = 509; // ERR_HISTORICAL(509)
        err.error_code = 500;
        return next(err);
    }
}

exports.GetGroupfiles = async (req, res, next) => {

    const whereParams = req.session.user !== undefined ?
        req.session.user.adultAccess ?
            { groupId: req.params.id, type: req.params.key, visibility: 1 }
            :
            { groupId: req.params.id, type: req.params.key, visibility: 1, adult: 0 }
        :
        { groupId: req.params.id, type: req.params.key, visibility: 1, adult: 0 };

    try {
        // Find all files belonging to the specified group ID
        await File.findAll({
            where: whereParams,
            attributes: ['id', 'name', 'type', 'miniature', 'groupId', 'adult', 'createdAt', 'ai', 'imagesCount', 'adminId', 'shop', 'diamond'],
            order: [['createdAt', 'DESC']] // Order the results by creation date in descending order
        })
            .then((promise) => {
                // Return the files as JSON response
                return res.status(200).json(promise);
            });
    } catch (error) {
        // Handle internal server error
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


exports.GetUserfiles = async (req, res, next) => {

    const whereParams = req.session.user !== undefined ?
        req.session.user.adultAccess ?
            { adminId: req.params.id, type: req.params.key, visibility: 1 }
            :
            { adminId: req.params.id, type: req.params.key, visibility: 1, adult: 0 }
        :
        { adminId: req.params.id, type: req.params.key, visibility: 1, adult: 0 };

    try {
        // Find all files uploaded by the specified admin ID
        await File.findAll({
            where: whereParams,
            attributes: ['id', 'name', 'type', 'miniature', 'groupId', 'adult', 'createdAt', 'ai', 'imagesCount', 'adminId', 'shop', 'diamond'],
            include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl'] }],
            order: [['createdAt', 'DESC']] // Order the results by creation date in descending order
        })
            .then((promise) => {
                // Return the files as JSON response
                return res.status(200).json(promise);
            });
    } catch (error) {
        // Handle internal server error
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.GetSimilarAnnouncement = async (req, res, next) => {
    try {
        // Parse the JSON array of tags from the request parameter
        const jsonArray = JSON.parse(req.params.key);

        // Function to normalize a word
        const normalizeWord = word => natural.PorterStemmerFr.stem(word.toLowerCase());

        // Normalize each tag in the JSON array
        const normalizedTags = jsonArray.map(el => normalizeWord(el.tag));

        // Find posts with tags similar to the normalized tags
        await Posts.findAll({
            where: {
                [Op.or]: normalizedTags.map(normalizedTag => Sequelize.literal(`LOWER(tags) LIKE '%${normalizedTag}%'`))
            },
            attributes: ['id', 'adminId', 'imageUrl', 'title', 'data', 'tags', 'createdAt'],
            include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl'] }],
            order: [['createdAt', 'DESC']],
        })
            .then((promise) => {
                // Return the similar announcements as JSON response
                return res.status(200).json(promise);
            });
    } catch (error) {
        // Handle internal server error
        res.status(500).json({ message: 'Internal Server Error' });
        const err = new Error('Get similar announcement fail (illustration, Manga... page).');
        err.unique_id = 510; // ERR_HISTORICAL(510)
        err.error_code = 500;
        return next(err);
    }
};

exports.GetfileSimilar = async (req, res, next) => {

    const whereParams = req.session.user !== undefined ?
        req.session.user.adultAccess ?
            { type: req.params.key1, visibility: 1 }
            :
            { type: req.params.key1, visibility: 1, adult: 0 }
        :
        { type: req.params.key1, visibility: 1, adult: 0 };

    try {
        // Parse the JSON array of tags from the request parameter
        const jsonArray = JSON.parse(req.params.key);

        // Function to normalize a word
        const normalizeWord = word => natural.PorterStemmerFr.stem(word.toLowerCase());

        // Normalize each tag in the JSON array
        const normalizedTags = jsonArray.map(el => normalizeWord(el.tag));

        // Define variables for JSON key and tags
        let tag = 'tag';
        let tags = 'tags';

        // Find files with tags similar to the normalized tags
        await File.findAll({
            where: {
                ...whereParams,
                [Op.or]: normalizedTags.map(normalizedTag => {
                    return Sequelize.literal(`LOWER(JSON_EXTRACT(${tags}, '$[*].${tag}')) LIKE '%${normalizedTag}%'`);
                })
            },
            attributes: ['id', 'name', 'type', 'miniature', 'groupId', 'adult', 'createdAt', 'ai', 'imagesCount', 'shop', 'diamond'],
            include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl'] }],
            order: [['createdAt', 'DESC']],
        })
            .then((promise) => {
                // Return the similar files as JSON response
                return res.status(200).json(promise);
            });
    } catch (error) {
        // Handle internal server error
        res.status(500).json({ message: 'Internal Server Error' });
        const err = new Error('Get files similar fail (illustration, Manga... page).');
        err.unique_id = 511; // ERR_HISTORICAL(511)
        err.error_code = 500;
        return next(err);
    }
}


exports.GetHomefile = async (req, res, next) => {
    const whereParams = req.session.user !== undefined ?
        req.session.user.adultAccess ?
            { type: 'Illustrations', visibility: 1 }
            :
            { type: 'Illustrations', visibility: 1, adult: 0 }
        :
        { type: 'Illustrations', visibility: 1, adult: 0 };

    try {
        await File.findAll({
            where: whereParams,
            attributes: ['id', 'name', 'type', 'miniature', 'groupId', 'adult', 'createdAt', 'ai', 'imagesCount', 'shop', 'diamond'],
            include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl'] }],
            order: [['createdAt', 'DESC']],
        })
            .then((promise) => {
                // Return the similar files as JSON response
                return res.status(200).json(promise);
            });
    } catch (error) {
        // Handle internal server error
        res.status(500).json({ message: 'Internal Server Error' });
        const err = new Error('Get files similar fail (illustration, Manga... page).');
        err.unique_id = 511; // ERR_HISTORICAL(511)
        err.error_code = 500;
        return next(err);
    }
}