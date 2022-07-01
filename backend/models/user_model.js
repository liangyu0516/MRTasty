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
        return {access_token: token, username: username}
    }
}

const signIn = async (email, password) => {
    const user = await pool.query("SELECT * FROM USER WHERE Email = ?", [email])

    if (user[0].length == 0){
        return {error: '信箱不存在哦，請先註冊'};
    }
    else {
        if (!(await bcrypt.compare(password, user[0][0].Password))) {
            return {error: '密碼錯誤'};
        }
        else {
            var token = jwt.sign(
                {
                    Uid: user[0][0].Uid,
                    Username: user[0][0].Username,
                    Email: user[0][0].Email
                },
                process.env.TOKEN_KEY,
                {
                    algorithm: 'HS256',
                    expiresIn: "3h"
                }
            );
            return {access_token: token, username: user[0][0].Username}
        }
    }
}

const getProfile = async (userID) => {
    const user = await pool.query("SELECT Uid, Email, Username FROM USER WHERE Uid = ?", [userID])
    return user[0][0]
}

module.exports = {
    signUp,
    signIn,
    getProfile,
}