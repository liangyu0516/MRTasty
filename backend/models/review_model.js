const {pool} = require('../../utils/mysqlcon')

const getReviews = async (place_id) => {
    const result = await pool.query("SELECT REVIEW.* FROM REVIEW, RESTAURANT WHERE RESTAURANT.Place_id = '" + place_id + "' and REVIEW.Rid = RESTAURANT.Rid")
    return result[0]
}

module.exports = {
    getReviews,
}