const System_error = require("../models/system_error");

exports.errorHandler_200 = async (err, req, res, next) => {
    // Traitement de l'erreur
    try {
        // Enregistrement de l'erreur dans l'historique des erreurs
        await System_error.create({
            unique_id: err.unique_id,
            error_code: err.error_code,
            userId: err.userId,
            message: err.message
        });
    } catch (error) {
        // Gestion des erreurs lors de l'enregistrement des détails de l'erreur
        console.error('Error recording error details:', error);
    }
}