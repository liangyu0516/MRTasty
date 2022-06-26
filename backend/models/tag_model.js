const {pool} = require('../../utils/mysqlcon')

const getTags = async (place_id) => {
    const result = await pool.query("SELECT TAG.Tag FROM TAG, RESTAURANT WHERE RESTAURANT.Place_id = '" + place_id + "' and TAG.Rid = RESTAURANT.Rid")
    return result[0].slice(0, 3)
}

module.exports = {
    getTags,
}