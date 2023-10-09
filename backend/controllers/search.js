const { models } = require('../db/mysql')
const { Op, Sequelize } = require('sequelize');
const User = require("../models/user");
const File = require('../models/files');
const Tag = require('../models/Tags');
const { login } = require("./login.signup");
const Groupfile = require('../models/groups_files');
let myRegex = new RegExp(/^[0-9a-zA-Z-éçàùè]+$/i);

exports.SaveTagsName = async (req, res, next) => {
    if (req.body.tag.length > 3) {
        const build = Tag.build({
            tag: req.body.tag
        })
        build.save()
            .then(() => { })
            .catch(() => { })
    }
}


exports.TagsName = async (req, res, next) => {
    if (!myRegex.test(req.params.key)) {
        return res.status(400).json({ message: 'Special characters are not supported.' })
    }
    await Tag.findAll({
        where: { tag: { [Op.like]: '%' + req.params.key + '%' } }, attributes: ['tag'],
        order: [['tag', 'ASC']]
    })
        .then(promise => {
            return res.status(200).json({ promise })
        });
}

exports.UsersName = async (req, res, next) => {
    await User.findAll({
        where: { pseudo: { [Op.regexp]: req.params.key } }, attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'premium', 'resizeImageUrlCover'],
        order: [['pseudo', 'ASC']]
    })
        .then(promise => {
            return res.status(200).json({ promise })
        });
}

exports.ArticleName = async (req, res, next) => {
    const searchValue = req.params.key.toLowerCase();
    await File.findAll({
        where: {
            visibility: 1,
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${searchValue}%`, // Recherche de nom insensible à la casse
                    },
                },
                Sequelize.literal(`LOWER(tags) LIKE '%${searchValue}%'`),
            ]
        },
        attributes: ['id', 'name', 'type', 'miniature', 'data', 'adult', 'createdAt', 'ai', 'imagesCount'],
        include: [{ model: models.users, attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'email', 'private', 'premium', 'resizeImageUrlCover'] }],
        order: [['name', 'ASC']]
    })
        .then(promise => {
            return res.status(200).json({ promise })
        });
}