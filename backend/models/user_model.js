require('dotenv').config({path: '../../process.env'});
const {pool} = require('../../utils/mysqlcon')
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

const signUp = async (email, username, password) => {
    const emails = await pool.query("SELECT Email FROM USER WHERE Email = ?", [email])
    if (emails[0].length > 0){
        return {error: 'Email already Exists'};
    }
    else {
        var encryptedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query("INSERT INTO USER (Email, Username, Password) VALUES(?, ?, ?)", [email, username, encryptedPassword])
        var token = await jwt.sign(
            {
                Uid: result[0].insertId,
                Username: username,
                Email: email
            },
            process.env.TOKEN_KEY,
            {
                algorithm: 'HS256',
                expiresIn: "3h"
            }
        );
        return {access_token: token}
    }
}

module.exports = {
    signUp,
}