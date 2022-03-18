const express = require('express');
const router = express.Router();
const monAxios = require('../axios/axios')

const methodNotAllowed = require('../errors/methodNotAllowed.js');

const url = "http://iut_sandwich_auth_service:3002"
const axios = monAxios(url)

//req.path 
/* GET home page. */
router.route('/')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(methodNotAllowed)
    .get(function (req, res, next) {
        axios.get('/users' + req.path).then(resp => {
        res.json(resp.data)
    })
})

router.route('/signup')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(async (req, res, next ) => {
        axios.post('/users' + req.path, req.body).then(resp => {
        res.json(resp.data)
        return res
        })
    })
    .get(methodNotAllowed)

router.route('/signin')
// Il faut gerer le fait que les adresse mails peuvent etre en doublon
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(async (req, res, next ) => {
        axios.post('/users' + req.path, req.body).then(resp => {
        res.json(resp.data)
        return res
        })
    })
    .get(methodNotAllowed)

router.route('/:id')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .post(methodNotAllowed)
    .put(methodNotAllowed)
    .get(function (req, res, next) {
            return res
    })

module.exports = router;
