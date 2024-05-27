const { Op } = require('sequelize');
const { models, Sequelize } = require('../db/mysql');
const File = require('../models/files');
const User = require('../models/user');
const Notification = require('../models/notifications');

exports.Get_user_profile_diamond = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'resizeImageUrlCover']
        });

        // Return the user profile with adult access set to 0
        return res.status(200).json({ user });
        //}
    } catch (error) {
        // If an error occurs during the database operation, handle it and return an error response
        console.error('Error in Get_user_profile:', error);
    }
};

exports.get_work_space_access_pass = async (req, res, next) => {
    try {
        const promise = await File.findOne({ where: { id: req.params.id }, attributes: ['price', 'shop'] });
        return res.status(200).json(promise);
    } catch (error) {
        console.error('Erreur lors de la récupération du pass d\'accès au workspace :', error);
        return res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du pass d\'accès au workspace.' });
    }
};

exports.NewArticle = async (req, res, next) => {
    // Vérifier si req.body.price est un nombre
    if (isNaN(req.body.price)) {
        return res.status(400).json({ error: 'Le prix doit être un nombre.' });
    }

    // Convertir req.body.price en nombre à virgule flottante
    const price = parseFloat(req.body.price);

    // Vérifier si le prix est valide
    if (isNaN(price) || price < 0) {
        return res.status(400).json({ error: 'Le prix doit être un nombre positif.' });
    }

    try {
        // Mettre à jour le fichier avec le prix et marquer comme disponible dans la boutique
        await File.update({ shop: true, price: price }, { where: { id: req.params.id } });
        return res.status(200).json({ message: 'Les images ont été ajoutées avec succès.' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'article :', error);
        return res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout de l\'article.' });
    }
};

exports.RemoveArticle = async (req, res, next) => {
    try {
        // Retirer l'article de la boutique en réinitialisant le prix et en définissant shop sur false
        await File.update({ shop: false, price: null }, { where: { id: req.params.id } });

        return res.status(200).json({ message: 'L\'article a été retiré avec succès de la boutique.' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'article :', error);
        return res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'article.' });
    }
};


exports.GetAccessPassFiles = async (req, res, next) => {
    const whereParams = req.session.user !== undefined ?
        req.session.user.adultAccess ?
            { type: 'Illustrations', visibility: 1, shop: 1 }
            :
            { type: 'Illustrations', visibility: 1, shop: 1, adult: 0 }
        :
        { type: 'Illustrations', visibility: 1, shop: 1, adult: 0 };

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

exports.GetOnefiles = async (req, res, next) => {
    await File.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'name', 'type', 'data', 'visibility', 'miniature', 'adminId', 'tags', 'comments', 'groupId', 'adult', 'ai', 'allowUserEditTag', 'dataDescription', 'price', 'purchase'],
        include: [
            {
                where: {
                    [Op.or]: [
                        { limited: 0 }
                    ]
                },
                model: models.images,
                attributes: ['id', 'imageUrl', 'caption', 'order', 'limited', 'updatedAt', 'createdAt'],
                order: [['order', 'asc']], // Déplacez cet ordre à l'intérieur de l'objet d'inclusion
                limit: 14 // Déplacez la limite ici, hors de l'objet d'inclusion
            },
            { model: models.users, attributes: ['id', 'pseudo', 'imageUrl', 'imageUrlCover', 'resizeImageUrlCover'] }
        ]
    })
        .then((promise) => {
            return res.status(200).json(promise)
        })
        .catch(() => { return res.status(400).json({ message: 'The search page no longer exists.' }) })
}

exports.PostBuyArticle = async (req, res, next) => {
    //console.log(req.body); 
    if (req.session.user.id === req.body.userId) {
        return res.status(400).json({ message: 'error.' })
    }

    const user = await User.findOne({ where: { id: req.session.user.id } });
    if (!user) {
        return res.status(400).json({ message: 'error.' })
    }

    if (user.coinBuy + user.coinBack < req.body.price) {
        return res.status(400).json({ message: 'error.' })
    }

    const pourcent = req.body.price * 0.70;

    // Define some variables
    const num = 0;
    const numP = 1;

    let coinBuy = req.body.useCash ? user.coinBack > req.body.price ? 0 : Math.abs(user.coinBack - req.body.price) : req.body.price;

    let coinBack = req.body.useCash ? req.body.price : 0;

    const data = `<div>
    Merci pour votre achat !
    <br>
    <img style="width: 80px; height: 80px; border-radius: 5px; display: flex; justify-content: center;" src='${req.body.img}' />
    nom: ${req.body.name}
    <br>
    Montant de l'article : ${req.body.price} pièces.
    <br>
    Cashback récupéré : ${req.body.cashBack} pièces.
    <br>
    Nous apprécions votre soutien !
    <br>
    ${'ArtVibes'}
  </div>`;

    try {
        User.update(
            {
                coinBuy: Sequelize.literal(`GREATEST(COALESCE(coinBuy, ${num}) - ${coinBuy}, ${num})`),
                coinBack: Sequelize.literal(`GREATEST(COALESCE(coinBack, ${num}) - ${coinBack} + ${req.body.cashBack}, ${num})`)
            },
            { where: { id: req.session.user.id } }
        )
        const build = Notification.build({
            forUser: req.session.user.id,
            notifId: `accessPass-${req.session.user.id}-${Date.now()}`,
            data: data
        })
        build.save()
        User.update(
            {
                coinPurchase: Sequelize.literal(`COALESCE(coinPurchase, ${num}) + ${pourcent}`),
                totalCoinPurchase: Sequelize.literal(`COALESCE(totalCoinPurchase, ${num}) + ${pourcent}`)
            },
            { where: { id: req.body.userId } }
        )
        File.update(
            {
                purchase: Sequelize.literal(`COALESCE(purchase, ${num}) + ${numP}`),
                totalCoins: Sequelize.literal(`COALESCE(totalCoins, ${num}) + ${pourcent}`)
            },
            { where: { id: req.body.fileId } }
        )
            .then(() => {
                console.log('Number of purchase updated successfully.');
                // Return success message
                return res.status(200).json({ message: "The user's pinned has successfully changed" });
            })
    } catch (error) {
        return res.status(500).json({ message: 'Error updating bookmark file pin.' });
    }

};