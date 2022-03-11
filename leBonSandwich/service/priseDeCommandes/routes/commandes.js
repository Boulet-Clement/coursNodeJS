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

router.route('/add')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(function (req, res, next) {
        //uuidv4
        const uuid = uuidv4();
        const created_at = "2019-11-08 13:45:55" // A Modifier
        const updated_at = created_at;
        //const created_at = new Date();
        //const updated_at = created_at;
        const { livraison, nom, mail, items } = req.body;
        const token = uuidv4();
        const client_id = null;
        const ref_paiement = null;
        const date_paiement = null;
        const mode_paiement = null;
        const remise = null;
        const status = 1;
        let montant = 0;
        if(items){
            items.forEach(item => {
                console.log(item.q)
                console.log(item.tarif)
                console.log(montant)
                montant += item.q * item.tarif
            });
        }
        knex.from('commande').insert(
            {
                'id': uuid,
                'created_at': created_at,
                'updated_at': updated_at,
                'livraison': livraison,
                'nom': nom,
                'mail': mail,
                'montant': montant,
                'remise': remise,
                'token': token,
                'client_id': client_id,
                'ref_paiement': ref_paiement,
                'date_paiement': date_paiement,
                'mode_paiement': mode_paiement,
                'status': status
            }
        ).then(() => {
            if (items != []){
                items.forEach(item => {
                    if (item.uri && item.q && item.libelle && item.tarif){
                        // Insert
                        console.log("hey")
                        knex.from('item').insert(
                            //Utiliser joi pour valider
                            {
                                'uri' : item.uri,
                                'libelle' : item.libelle,
                                'tarif': item.tarif,
                                'quantite': item.q,
                                'command_id': uuid
                            }
                        ).catch((err) => {
                            console.log(err)
                        })
                    }
                });
            
            }
            res.status(201).json({
                "Location" : `/commandes/${uuid}`,
                "commande": {
                    "nom" : nom,
                    "mail" : mail,
                    "date_livraison" : livraison,
                    "id" : uuid,
                    "token" : token,
                    "montant" : montant
                }
            })
            
        }
        ).catch((err) => {
            res.status(500).json({
                "type": "error",
                "error": 500,
                "message": `Erreur de connexion à la base de données ` + err
            });
        })
    })
    .get(methodNotAllowed)

router.route('/:id')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .post(methodNotAllowed)
    .get(function (req, res, next) {
        if (req.query.embed && req.query.embed === "items") {
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
        let token = req.body.token
        knex.from('commande')
            .select('id','token')
            .where({
                'id': req.params.id,
                'token': token
                })
            .first()
            .then((commande) => {
                console.log(commande)
                if (! (typeof commande === "undefined")){
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
                        knex.from('commande').where('id', req.params.id).update({
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
                                res.status(201).json(commande);
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
                }else{
                    res.status(404).json({
                        "type": "error",
                        "error": 404,
                        "message": `Impossible d'executer la requete, le token n'a pas l'air bon`
                    });
                }
            
            }).catch((err) => {
                console.log(err)
                res.status(500).json({
                    "type": "error",
                    "error": 500,
                    "message": `Erreur de connexion à la base de données`
                });
            })
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

module.exports = router;
