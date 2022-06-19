const {pool} = require('../../utils/mysqlcon')

const getStationPosition = async (station_en) => {
    const result = await pool.query("SELECT * FROM STATION WHERE Name_en = '" + station_en + "'")
    return [result[0][0].Latitude, result[0][0].Longitude];
}

module.exports = {
    getStationPosition,
}