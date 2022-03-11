const express = require('express');
const router = express.Router();
const knex = require('../knex.js');
const { v4: uuidv4 } = require('uuid');

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
                    let orders =
                    {
                        type: "collection",
                        count: commandes.length,
                        commandes: commandes
                    }
                    res.status(200).json(orders)
                }
            }).catch((err) => {
                res.status(500).json({
                    "type": "error",
                    "error": 500,
                    "message": `Erreur de connexion à la base de données ` + err
                });
            })

    })


module.exports = router;
