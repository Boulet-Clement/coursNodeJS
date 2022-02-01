const express = require('express');
const router = express.Router();
const knex = require('../knex.js');

let commandes = {
    "type": "collection",
    "count": 3,
    "commandes": [
    {
    "id": "AuTR4-65ZTY",
    "mail_client": "jan.neymar@yaboo.fr",
    "date_commande": "2022-01-05 12:00:23",
    "montant": 25.95
    },
    {
    "id": "657GT-I8G443",
    "mail_client": "jan.neplin@gmal.fr",
    "date_commande": "2022-01-06 16:05:47",
    "montant": 42.95
    },
    {
    "id": "K9J67-4D6F5",
    "mail_client": "claude.francois@grorange.fr",
    "date_commande": "2022-01-07 17:36:45",
    "montant": 14.95
    },
    ]
   }

/* GET home page. */
router.get('/', function(req, res, next) {
    knex.from('commande')
        .select('*')
        .then((commandes) => {
            console.log(commandes)
            if (commandes == null){
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": `ressources non disponibles`});
            }else{
                res.status(200).json(commandes)
            }
        }).catch((err) => {
            res.status(500).json({
                "type": "error",
                "error": 500,
                "message": `Erreur de connexion à la base de données ` + err});
            })
        .finally(() => {
        // knex.destroy();
        });
});

router.get('/:id', function(req, res, next) {
    
    knex.from('commande')
        .select('*')
        .where({
            'id': req.params.id
          }).first()
        .then((commande) => {
            console.log(commande)
            if (commande == null){
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": `ressource non disponible : ${req.params.id}`});
            }else{
                res.status(200).json(commande)
            }
        }).catch((err) => {
            res.status(500).json({
                "type": "error",
                "error": 500,
                "message": `Erreur de connexion à la base de données` + err});
            })
        .finally(() => {
        // knex.destroy();
        });
    
});

router.get('/:id', function(req, res, next) {
    let commande = commandes.commandes.find( commande => commande.id === req.params.id)
    if(commande != null){
        res.status(200).json(commande)
    }else{
        res.status(400).json({
            "type": "error",
            "error": 404,
            "message": `ressource non disponible : ${req.params.id}`});
    }
});

module.exports = router;
