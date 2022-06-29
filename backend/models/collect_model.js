const {pool} = require('../../utils/mysqlcon')

const addCollect = async (userID, place_id) => {
    const insertResult = await pool.query("INSERT INTO COLLECT (Uid, Place_id) VALUES(?, ?)", [userID, place_id])
    return insertResult[0].insertId
}

const checkCollect = async (userID, place_id) => {
    const checkResult = await pool.query("SELECT * FROM COLLECT WHERE Uid = ? and Place_id = ?", [userID, place_id])
    if (checkResult[0].length == 0) {
        return false
    }
    else {
        return true
    }
}

module.exports = {
    addCollect,
    checkCollect,
}