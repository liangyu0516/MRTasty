const crypto = require('crypto');
//const User = require('../server/models/user_model');
const {TOKEN_SECRET} = process.env; // 30 days by seconds
//const jwt = require('jsonwebtoken');

// reference: https://thecodebarbarian.com/80-20-guide-to-express-error-handling
const wrapAsync = (fn) => {
    return function(req, res, next) {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
        fn(req, res, next).catch(next);
    };
};

const authorization = (req, res, next) => {
    const token = req.cookies;
    console.log('token', token)
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, "YOUR_SECRET_KEY");
      req.userId = data.id;
      req.userRole = data.role;
      return next();
    } catch {
      return res.sendStatus(403);
    }
};

module.exports = {
    wrapAsync,
    authorization
};
