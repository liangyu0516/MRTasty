const {pool} = require('../../utils/mysqlcon')

const getNearRestaurants = async (keyword, stationID) => {
    const result = await pool.query("SELECT * FROM RESTAURANT WHERE Sid = ? and Type = ?", [stationID, keyword])
    //console.log(result[0])
    return result[0];
}

module.exports = {
    getNearRestaurants,
}