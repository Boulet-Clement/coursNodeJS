const express = require('express');
const router = express.Router();

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
    res.status(200).json(commandes);
});

router.get('/:id', function(req, res, next) {
    res.status(200).json(commandes.commandes.find( commande => commande.id === req.params.id))
});

module.exports = router;
