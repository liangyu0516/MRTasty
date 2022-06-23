const {pool} = require('../../utils/mysqlcon')

const getNearRestaurants = async (keyword, stationID) => {
    const result = await pool.query("SELECT * FROM RESTAURANT WHERE Sid = " + stationID)
    //console.log(result[0])
    return result[0];
}

module.exports = {
    getNearRestaurants,
}