const jwt = require('jsonwebtoken');
const validator = require("validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");



module.exports = (req, res, next) => {
    if (req.token && req.userId && req.isAuth)
        next();
    // User FindById
    const auth = req.get('Authorization');
    if (!auth) {
        req.isAuth = false;
        return next();
    }
    const token = auth.split(' ')[1];
    if (!token) {
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'haystack');
    } catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!decodedToken) {
        req.isAuth = false;
        next();
    }


    req.userId = decodedToken.userId;
    req.isAuth = true;
    next();

};
