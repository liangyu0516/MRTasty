const e = require('cors');
const User = require('../models/user_model');

const signUp = async (req, res) => {
    const {email, username, password} = req.body;

    if(!username || !email || !password) {
        return res.status(400).send({error:'Request Error: name, email and password are required.'});
    }
    
    const result = await User.signUp(email, username, password);
    if (result.error) {
        return res.status(403).send({error: result.error});
    }
    else {
        return res.status(200).json(result)
    }
};

const signIn = async (req, res) => {
    const { email, password} = req.body;

    if(!email || !password) {
        return res.status(400).send({error:'Request Error: name, email and password are required.'});
    }

    const result = await User.signIn(email, password);
    if (result.error) {
        return res.status(403).send({error: result.error});
    }
    else {
        return res.status(200).json(result)
    }
};

module.exports = {
	signUp,
    signIn,
};