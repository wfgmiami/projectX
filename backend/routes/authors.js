const router = require('express').Router();

const db = require('../db');

router.get('/', (req, res, next) => {
  db.Author.findAll()
  .then( authors => res.json(authors))
  .catch( next );
});


module.exports = router;
