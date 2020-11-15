const router = require( 'express' ).Router();
const db = require( '../db' );

module.exports = router;

router.post( '/', ( req, res, next ) => {
  console.log('be: user: reg.body ', req.body)
  db.User.create( req.body )
    .then( user => {
      res.send( user );
    } )
    .catch( next );
} );
