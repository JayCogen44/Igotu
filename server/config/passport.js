const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("../model/database");

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
      },

      (accessToken, refreshToken, profile, cb) => {
        const image = profile.photos[0].value.substring(
          0,
          profile.photos[0].value.indexOf("?")
        );

        // check for user

        let queryText = `SELECT googleid FROM oauth_users WHERE googleID = '${
          profile.id
        }'`;

        pool.query(queryText).then(user => {
          let userCheck = user.rows.length;

          if (userCheck !== 0) {
            //return user
            cb(null, user);
          } else {
            let queryInsert = `INSERT INTO oauth_users(googleid,username,lastName,firstName,image) VALUES ('${profile.id.toString()}','${
              profile.displayName
            }','${profile.name.familyName}','${
              profile.name.givenName
            }','${image}')`;

            pool.query(queryInsert, (err, user) => {
              if (err) {
                console.log(err);
              }
            });
          }
        });
        return cb(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    done(null, id);
  });
};
