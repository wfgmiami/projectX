const router = require( 'express' ).Router();

router.use('/articles', require('./articles'));

router.use('/authors', require('./authors'));

router.use('/signin', require('./session'));

router.use('/signup', require('./user'));

router.use(function(req, res) {
  res.status(404).end();
})


module.exports = router;
