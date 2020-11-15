const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('./db/models/user');
const jwt = require('jwt-simple');

module.exports = app => {
  app.use(passport.initialize());

  // Google strategy
  passport.use(
    new GoogleStrategy( app.get( 'oauth' ).googleInfo,
      ( token, refreshToken, profile, done ) => {
        let nameArray = profile.displayName.split( ' ' );
        User.findOrCreate( {
            where: { googleId: profile.id },
            defaults: {
              firstname: nameArray[ 0 ],
              lastname: nameArray[ 1 ],
              username: profile.emails[ 0 ].value,
              email: profile.emails[ 0 ].value,
              password: profile.id
            }
          } )
          .spread( user => {
            done( null, user );
          } )
          .catch( done );
      } )

  );

}
