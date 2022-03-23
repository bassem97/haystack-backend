const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require('../models/user');
const Session = require('../models/user');

const GOOGLE_CLIENT_ID = '912577134712-br4ui585rlm1k3ptrkpbkfhaqiaurmgh.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const CLIENT_URL = "http://localhost:8080/auth/google/callback";

passport.use(new GoogleStrategy({
        userID: GOOGLE_CLIENT_ID,
        userSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: CLIENT_URL,
    },
    function(accessToken, refreshToken, profile, done) {

        const user = new User();
        user.firstName =profile._json.given_name;
        user.lastName =profile._json.family_name;
        user.email =profile._json.email;
        user.image =profile._json.picture;
        user.googleId =profile._json.sub;        // user.refreshToken = refreshToken
        user.save();

    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});



