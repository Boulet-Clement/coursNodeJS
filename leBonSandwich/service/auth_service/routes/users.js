const express = require('express');
const router = express.Router();
const knex = require('../knex.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

const methodNotAllowed = require('../errors/methodNotAllowed.js');

const JWT_SECRET = process.env.JWT_SECRET;

/* GET home page. */
router.route('/')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(methodNotAllowed)
    .get(function (req, res, next) {

        knex.from('client')
            .select('*')
            .then((users) => {
                console.log(users)
                if (users == null) {
                    res.status(404).json({
                        "type": "error",
                        "error": 404,
                        "message": `ressources non disponibles`
                    });
                } else {
                    let liste_users =
                    {
                        type: "collection",
                        count: users.length,
                        users: users
                    }
                    res.status(200).json(liste_users)
                }
            }).catch((err) => {
                res.status(500).json({
                    "type": "error",
                    "error": 500,
                    "message": `Erreur de connexion à la base de données ` + err
                });
            })

    })

router.route('/signup')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(async (req, res, next ) => {
        //uuidv4
        const uuid = uuidv4();
        const { nom_client, mail_client, password } = req.body
        const passwd = await bcrypt.hash(password, 10);
        const cumul_achat = 0.0;
        const created_at = "2019-11-08 13:45:55" // A Modifier et mettre la date du jour
        const updated_at = created_at;
        //const created_at = new Date();
        //const updated_at = created_at;
        knex.from('client').insert(
            {
                'id': uuid,
                'nom_client' : nom_client,
                'mail_client': mail_client,
                'passwd' : passwd,
                'cumul_achats' : cumul_achat,
                'created_at': created_at,
                'updated_at': updated_at,
            }
        ).then(() => {
            res.status(201).json({
                "Location" : `/users/${uuid}`,
                "user": {
                    'nom' : nom_client,
                    'mail': mail_client,
                    'cumul_achats' : cumul_achat,
                    'created_at': created_at,
                    'updated_at': updated_at,
                }
            })
        })
        .catch((err) => {
            res.status(500).json({
                "type": "error",
                "error": 500,
                "message": `Erreur de connexion à la base de données ` + err
            });
        })
    })
    .get(methodNotAllowed)

router.route('/signin')
// Il faut gerer le fait que les adresse mails peuvent etre en doublon
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(async (req, res, next ) => {
        const { mail_client, password } = req.body
        knex.from('client').select('id','nom_client', 'mail_client','passwd', 'cumul_achats', 'created_at', 'updated_at')
        .where({
            'mail_client': mail_client
        }).first()
        .then(async(user) => {
            if (!user) { res.status(400).json({ error: "Invalid username or password", status: "error" }); return; }

            if (! await bcrypt.compare(password, user.passwd)) { res.status(400).json({ error: "Invalid username or password", status: "error" }); return; }
        
            const token = jwt.sign(
                {
                    id: user._id,
                    username: user.username
                },
                JWT_SECRET
            );
        
            res.status(200).json({ data: token, status: "ok" });
        })
        .catch((err) => {
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
    .put(methodNotAllowed)
    .get(function (req, res, next) {
            knex.from('client')
                .select('id', 'nom_client','mail_client','cumul_achats','created_at','updated_at')
                .where({
                    'id': req.params.id
                }).first()
                .then((user) => {
                    console.log(user)
                    if (user === null) {
                        res.status(404).json({
                            "type": "error",
                            "error": 404,
                            "message": `ressource non disponible : ${req.params.id}`
                        });
                    } else {
                        let the_user = {
                            type: "ressource",
                            user: user,
                        }
                        res.status(200).json(the_user)
                    }
                }).catch((err) => {
                    res.status(500).json({
                        "type": "error",
                        "error": 500,
                        "message": `Erreur de connexion à la base de données` + err
                    });
                })
    })

module.exports = router;
