const File = require('../models/files');
const Posts = require('../models/post');
const User = require('../models/user');
const { models } = require('../db/mysql');
const { Op, Sequelize } = require('sequelize');
const natural = require('natural');


exports.GetIllustrationfile = async (req, res, next) => {
    await File.findOne({
        where: {
            visibility: 1,
            id: req.params.id
        },
        attributes:
            [
                'id',
                'name',
                'type',
                'data',
                'visibility',
                'miniature',
                'imagesCount',
                'resize',
                'adminId',
                'comments',
                'groupId',
                'adult',
                'tags',
                'ai',
                'allowUserEditTag',
                'viewUsers',
                'view'
            ],
        include: [{ model: models.images, attributes: ['id', 'imageUrl', 'caption', 'order'] }, { model: models.users, attributes: ['id', 'pseudo', 'imageUrl'] }
            , { model: models.groupsfiles, attributes: ['id', 'name', 'imageUrl', 'data'] }],
        order: [
            [models.images, 'order', 'asc']
        ]
    })
        .then(async (promise) => {
            let view1 = promise.view || 0;
            if (!promise.viewUsers || promise.viewUsers.length === 0) {
                // Si viewUsers est vide, ajoutez une nouvelle entrée et mettez à jour la base de données
                const build = {
                    viewUsers: [{ userId: req.session.user.id, date: Date.now(), view: 1 }],
                    view: view1 + 1
                };
                await File.update(build, { where: { id: req.params.id } });
            } else {
                // Recherchez l'utilisateur dans viewUsers
                let user = promise.viewUsers.find((el) => el.userId === req.session.user.id);
                if (!user) {
                    // Si l'utilisateur n'est pas trouvé, ajoutez une nouvelle entrée et mettez à jour la base de données
                    const build = {
                        viewUsers: [{ userId: req.session.user.id, date: Date.now(), view: 1 }, ...promise.viewUsers],
                        view: view1 + 1
                    };
                    await File.update(build, { where: { id: req.params.id } });
                } else {
                    // Si l'utilisateur est trouvé, vérifiez le temps écoulé depuis sa dernière visite
                    const uneHeure = 60 * 60 * 1000;// 60 * 60 * // Une heure en millisecondes
                    const tempsEcoule = Date.now() - user.date;
                    if (tempsEcoule >= uneHeure) {
                        // Si une heure s'est écoulée, mettez à jour les données et la base de données
                        let arrayUserViewsFilter = promise.viewUsers.filter((el) => el.userId !== req.session.user.id);
                        let view1 = promise.view || 0;
                        const build = {
                            viewUsers: [{ userId: req.session.user.id, date: Date.now(), view: user.view + 1 || 1 }, ...arrayUserViewsFilter],
                            view: view1 + 1
                        };
                        await File.update(build, { where: { id: req.params.id } });
                    }
                }
            }

            delete promise.dataValues.viewUsers;
            delete promise.dataValues.view;
            // Réponse à la requête
            return res.status(200).json(promise);
        })
        .catch(() => { return res.status(400).json({ message: 'The search page no longer exists.' }) })
}

exports.GetParamsfiles = async (req, res, next) => {
    try {
        // Recherche du fichier
        const file = await File.findOne({
            where: { visibility: 1, id: req.params.id },
            attributes: ['bookMarks', 'view', 'dateRework', 'createdAt']
        });

        if (!file) {
            return res.status(404).json({ message: 'Fichier non trouvé' });
        }

        // Recherche de l'utilisateur
        const user = await User.findOne({
            where: { id: req.session.user.id },
            attributes: ['filesBookmark']
        });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérification si l'utilisateur a aimé ce fichier
        let table = user.filesBookmark || [];
        const BookmarksId = table.filter((id) => id === parseInt(req.params.id))

        // Construction de la réponse JSON
        const response = {
            file: file,
            BookmarksId: BookmarksId[0]
        };

        // Envoi de la réponse
        return res.status(200).json(response);
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return res.status(500).json({ message: 'Erreur lors de la récupération des données' });
    }
}

exports.newBookMark = async (req, res, next) => {
    await User.findOne({
        where: { id: req.session.user.id },
        attributes: ['id', 'filesBookmark']
    }).then((user) => {
        let table = user.dataValues.filesBookmark != null ? user.dataValues.filesBookmark : [];
        const filteredUsers = table.filter((id) => id == req.body.groupId)

        const test = 0;
        const test1 = 1;

        if (parseInt(filteredUsers) == req.body.groupId) {
            const filtered = table.filter((id) => id != req.body.groupId)
            User.update({ filesBookmark: filtered }, { where: { id: req.session.user.id } })
                .then(() => {
                    File.update(
                        { bookMarks: Sequelize.literal(`GREATEST(COALESCE(bookMarks, ${test}) - ${test1}, ${test})`) },
                        { where: { id: req.body.groupId } }
                    )
                        .then(() => {
                            console.log('Nombre de BookMark mis à jour avec succès.');
                            return res.status(200).json({ message: "The user's pinned has successfully changed" });
                        })
                        .catch((error) => {
                            console.error('Erreur BookMark de la mise à jour du nombre de bookMarks:', error);
                        });
                })
        } else {

            const unique = Array.from(new Set([...user.dataValues.filesBookmark != null ? user.dataValues.filesBookmark : [], req.body.groupId]));
            User.update({ filesBookmark: unique }, { where: { id: req.session.user.id } })

                .then(() => {
                    File.update(
                        { bookMarks: Sequelize.literal(`COALESCE(bookMarks, ${test}) + ${test1}`) },
                        { where: { id: req.body.groupId } }
                    )
                        .then(() => {
                            console.log('Nombre de bookMarks mis à jour avec succès.');
                            return res.status(200).json({ message: "The user's pinned has successfully changed" });
                        })
                        .catch((error) => {
                            return res.status(400).json(error)
                        });
                })
        }
    })
}

exports.updateTags = async (req, res, next) => {
    const jsonArray = JSON.parse(req.body.tags);
    File.update({ tags: jsonArray }, { where: { id: req.params.id } })
        .then(() => {
            return res.status(200).json({ message: "Tags has successfully changed" });
        })
        .catch((error) => {
            return res.status(400).json(error)
        });
}

exports.GetGroupfiles = async (req, res, next) => {
    await File.findAll({
        where: {
            visibility: 1,
            type: 'Illustrations',
            groupId: req.params.id
        },
        attributes: ['id', 'name', 'type', 'miniature', 'groupId', 'adult', 'createdAt', 'ai', 'imagesCount', 'adminId'],
        order: [['createdAt', 'DESC']]
    })
        .then((promise) => {
            return res.status(200).json(promise)
        })
        .catch((error) => {
            return res.status(400).json(error)
        });
}
exports.GetUserfiles = async (req, res, next) => {
    await File.findAll({
        where: {
            visibility: 1,
            type: 'Illustrations',
            adminId: req.params.id
        },
        attributes: ['id', 'name', 'type', 'miniature', 'groupId', 'adult', 'createdAt', 'ai', 'imagesCount', 'adminId'],
        order: [['createdAt', 'DESC']]
    })
        .then((promise) => {
            return res.status(200).json(promise)
        })
}

exports.GetSimilarAnnouncement = async (req, res, next) => {
    const jsonArray = JSON.parse(req.params.key);
    //console.log(jsonArray);
    // Fonction pour normaliser un mot
    const normalizeWord = word => natural.PorterStemmerFr.stem(word.toLowerCase());

    const normalizedTags = jsonArray.map(el => normalizeWord(el.tag));


    try {
        await Posts.findAll({
            where: {
                [Op.or]: normalizedTags.map(normalizedTag => Sequelize.literal(`LOWER(tags) LIKE '%${normalizedTag}%'`))
            },
            attributes: ['id', 'adminId', 'imageUrl', 'title', 'data', 'tags', 'createdAt'],
            include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl'] }],
            order: [['createdAt', 'DESC']],
        })
            .then((promise) => {
                return res.status(200).json(promise)
            })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.GetfileSimilar = async (req, res, next) => {
    const jsonArray = JSON.parse(req.params.key);
    // Fonction pour normaliser un mot
    const normalizeWord = word => natural.PorterStemmerFr.stem(word.toLowerCase());
    const normalizedTags = jsonArray.map(el => normalizeWord(el.tag));


    let tag = 'tag';
    let tags = 'tags';

    await File.findAll({
        where: {
            visibility: 1,
            type: 'Illustrations',
            [Op.or]: normalizedTags.map(normalizedTag => {
                return Sequelize.literal(`LOWER(JSON_EXTRACT(${tags}, '$[*].${tag}')) LIKE '%${normalizedTag}%'`);
            })
        },
        attributes: ['id', 'name', 'type', 'miniature', 'groupId', 'adult', 'createdAt', 'ai', 'imagesCount'],
        include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl'] }],
        order: [['createdAt', 'DESC']],
    })
        .then((promise) => {
            return res.status(200).json(promise)
        })
        .catch((err) => {
            return res.status(400).json({ message: err })
        })
}
