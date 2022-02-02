const express = require('express');
const router = express.Router();
const knex = require('../knex.js');

const methodNotAllowed = require('../errors/methodNotAllowed.js');

/* GET home page. */
router.route('/')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(methodNotAllowed)
    .get(function (req, res, next) {
        knex.from('commande')
            .select('*')
            .then((commandes) => {
                console.log(commandes)
                if (commandes == null) {
                    res.status(404).json({
                        "type": "error",
                        "error": 404,
                        "message": `ressources non disponibles`
                    });
                } else {
                    res.status(200).json(commandes)
                }
            }).catch((err) => {
                res.status(500).json({
                    "type": "error",
                    "error": 500,
                    "message": `Erreur de connexion à la base de données ` + err
                });
            })
            .finally(() => {
                // knex.destroy();
            });
    })

router.get('/:id', function (req, res, next) {

    knex.from('commande')
        .select('*')
        .where({
            'id': req.params.id
        }).first()
        .then((commande) => {
            console.log(commande)
            if (commande == null) {
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": `ressource non disponible : ${req.params.id}`
                });
            } else {
                res.status(200).json(commande)
            }
        }).catch((err) => {
            res.status(500).json({
                "type": "error",
                "error": 500,
                "message": `Erreur de connexion à la base de données` + err
            });
        })
        .finally(() => {
            // knex.destroy();
        });

});

router.get('/:id', function (req, res, next) {
    let commande = commandes.commandes.find(commande => commande.id === req.params.id)
    if (commande != null) {
        res.status(200).json(commande)
    } else {
        res.status(404).json({
            "type": "error",
            "error": 404,
            "message": `ressource non disponible : ${req.params.id}`
        });
    }
});

module.exports = router;
