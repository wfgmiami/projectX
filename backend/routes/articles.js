const router = require('express').Router();

const db = require('../db');

router.get('/', (req, res, next) => {
  db.Article.findAll()
  .then( articles => res.json(articles) )
  .catch( next )
});


module.exports = router;
