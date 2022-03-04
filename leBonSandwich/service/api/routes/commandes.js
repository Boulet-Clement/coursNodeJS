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
router.route('/:id')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .post(methodNotAllowed)
    .get(function (req, res, next) {
        if (req.query.embed && req.query.embed === "items" ) {
            knex.from('commande')
            .select('id', 'mail', 'nom', 'created_at', 'livraison', 'montant')
            .where({
                'id': req.params.id
            }).first()
            .then((commande) => {
                console.log(commande)
                if (commande === null) {
                    res.status(404).json({
                        "type": "error",
                        "error": 404,
                        "message": `ressource non disponible : ${req.params.id}`
                    });
                } else {
                    let order = {
                        type: "ressource",
                        commande: commande,
                    }
                    knex.from('item')
                        .select(' id', 'libelle', 'tarif', 'quantite ')
                        .where({
                            'command_id': req.params.id
                        })
                        .then((items) => {
                            if (items === null) {
                                order.links =
                                {
                                    items: {
                                        href: `/commandes/${req.params.id}/items`
                                    },
                                    self: {
                                        href: `/commandes/${req.params.id}/`
                                    }
                                }
                                res.status(200).json(order)
                            } else {
                                order.commande.items = Array()
                                items.forEach(item => {
                                    order.commande.items.push(item)
                                });
                                order.links =
                                {
                                    items: {
                                        href: `/commandes/${req.params.id}/items`
                                    },
                                    self: {
                                        href: `/commandes/${req.params.id}/`
                                    }
                                }
                                res.status(200).json(order)
                            }
                        })
                }
            }).catch((err) => {
                res.status(500).json({
                    "type": "error",
                    "error": 500,
                    "message": `Erreur de connexion à la base de données` + err
                });
            })
        } else {
            knex.from('commande')
                .select('*')
                .where({
                    'id': req.params.id
                }).first()
                .then((commande) => {
                    console.log(commande)
                    if (commande === null) {
                        res.status(404).json({
                            "type": "error",
                            "error": 404,
                            "message": `ressource non disponible : ${req.params.id}`
                        });
                    } else {
                        let order = {
                            type: "ressource",
                            commande: commande,
                            links:
                            {
                                items: {
                                    href: `/commandes/${req.params.id}/items`
                                },
                                self: {
                                    href: `/commandes/${req.params.id}/`
                                }
                            }
                        }
                        res.status(200).json(order)
                    }
                }).catch((err) => {
                    res.status(500).json({
                        "type": "error",
                        "error": 500,
                        "message": `Erreur de connexion à la base de données` + err
                    });
                })
        }
    })
    .put(async function (req, res, next) {
        let commande;
        console.log(htmlEntities(req.body.nom))
        try {
            if (req.body.nom) {
                req.body.nom = htmlEntities(req.body.nom)
            }
            if (req.body.mail) {
                req.body.mail = htmlEntities(req.body.mail)
            }
            if (req.body.livraison) {
                req.body.livraison = htmlEntities(req.body.livraison)
            }
            await knex.from('commande').where('id', req.params.id).update({
                nom: req.body.nom,
                mail: req.body.mail,
                livraison: req.body.livraison,
                updated_at: new Date()
            }).then((rows) => {
                if (rows === 0) {
                    res.status(404).json({
                        "type": "error",
                        "error": 404,
                        "message": `commande ${req.params.id} non trouvée`
                    });
                } else {
                    res.status(204).json(commande);
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                "type": "error",
                "error": 500,
                "message": `Impossible d'executer la requete`
            });
        }
        function htmlEntities(str) {
            if (str === "") {
                return null
            } else
                return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&quot');
        }
    });

router.route('/:id/items')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .post(methodNotAllowed)
    .get(function (req, res, next) {

        knex.from('item')
            .select(' id', 'libelle', 'tarif', 'quantite ')
            .where({
                'command_id': req.params.id
            })
            .then((items) => {
                if (items === null) {
                    res.status(404).json({
                        "type": "error",
                        "error": 404,
                        "message": `La commande n'a pas d'item`
                    });
                }
                else {
                    let orderItems = {
                        type: "collection",
                        count: items.length,
                        items: Array()
                    }
                    items.forEach(item => {
                        orderItems.items.push(item)
                    });
                    res.status(200).json(orderItems)
                }
            })
    });
/*
router.route('/:id/items')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .post(methodNotAllowed)
    .get(function (req, res, next) {
        knex.from('commande')
            .select('id', 'mail', 'nom', 'created_at', 'livraison', 'montant')
            .where({
                'id': req.params.id
            }).first()
            .then((commande) => {
                console.log(commande)
                if (commande === null) {
                    res.status(404).json({
                        "type": "error",
                        "error": 404,
                        "message": `ressource non disponible : ${req.params.id}`
                    });
                } else {
                    let order = {
                        type: "ressource",
                        commande: commande,
                    }
                    knex.from('item')
                        .select(' id', 'libelle', 'tarif', 'quantite ')
                        .where({
                            'command_id': req.params.id
                        })
                        .then((items) => {
                            if (items === null) {
                                order.links =
                                {
                                    items: {
                                        href: `/commandes/${req.params.id}/items`
                                    },
                                    self: {
                                        href: `/commandes/${req.params.id}/`
                                    }
                                }
                                res.status(200).json(order)
                            } else {
                                order.commande.items = Array()
                                items.forEach(item => {
                                    order.commande.items.push(item)
                                });
                                order.links =
                                {
                                    items: {
                                        href: `/commandes/${req.params.id}/items`
                                    },
                                    self: {
                                        href: `/commandes/${req.params.id}/`
                                    }
                                }
                                res.status(200).json(order)
                            }
                        })
                }
            }).catch((err) => {
                res.status(500).json({
                    "type": "error",
                    "error": 500,
                    "message": `Erreur de connexion à la base de données` + err
                });
            })
    });
 */
module.exports = router;
