require('dotenv').config({path: '../process.env'});
const crypto = require('crypto');
//const User = require('../server/models/user_model');
const {TOKEN_SECRET} = process.env; // 30 days by seconds
const jwt = require('jsonwebtoken');

// reference: https://thecodebarbarian.com/80-20-guide-to-express-error-handling
const wrapAsync = (fn) => {
    return function(req, res, next) {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
        fn(req, res, next).catch(next);
    };
};

const authorization = (req, res, next) => {
    var token = req.get('Authorization');
    if (!token) {
      return res.status(401).send({error: 'Unauthorized'});
    }

    token = token.replace('Bearer ', '');
    if (token == 'null') {
        return res.status(401).send({error: 'Unauthorized'});
    }

	try {
		const data = jwt.verify(token, process.env.TOKEN_KEY);
		req.Uid = data.Uid
		return next();
	}
	catch {
		return res.status(403).send({error: 'Forbidden'});
	}

};

module.exports = {
    wrapAsync,
    authorization
};
