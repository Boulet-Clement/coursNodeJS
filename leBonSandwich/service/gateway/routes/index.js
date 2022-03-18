let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('*', function(req, res, next) {
  res.status(400).json({
    "type": "error",
    "error": 400,
    "message": `Erreur dans la requete.`
  });
});

module.exports = router;
