const express = require('express');
const router = express.Router();

const methodNotAllowed = require('../errors/methodNotAllowed.js');

/* GET home page. */
router.route('/')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(methodNotAllowed)
    .get(function (req, res, next) {
        return res
    })

router.route('/add')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(function (req, res, next) {
        return res
    })
    .get(methodNotAllowed)

router.route('/:id')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .post(methodNotAllowed)
    .get(function (req, res, next) {
     return res
    })
    .put(async function (req, res, next) {
        return res
    });

router.route('/:id/items')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .post(methodNotAllowed)
    .get(function (req, res, next) {
        return res
    });

module.exports = router;
