const express = require('express');
const router = express.Router();

const monAxios = require('../axios/axios')

const methodNotAllowed = require('../errors/methodNotAllowed.js');

const url = "http://iut_sandwich_suivi_fabrication:3001"
const axios = monAxios(url)

/* GET home page. */
router.route('/')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(methodNotAllowed)
    .get(function (req, res, next) {
        axios.get('/commandes' + req.path).then(resp => {
        res.json(resp.data)
        })
    })


module.exports = router;
