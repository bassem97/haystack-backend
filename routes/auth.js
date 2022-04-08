const passport = require("passport");
const router = require("express").Router();
// require("../middlewares/strategies/GoogleStrategy");
const userController = require("../controllers/user");

const CLIENT_URL = "http://localhost:5000/";




router.get("/google", passport.authenticate("google", { scope: ['profile'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:5000/login/failed' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('http://localhost:5000/');
    });

router.route('/login')
    .post( userController.login)
router.route('/register')
    .post( userController.createUser)




module.exports = router
