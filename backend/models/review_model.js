require('dotenv').config({path: '../../process.env'});
const {pool} = require('../../utils/mysqlcon')

const getReviews = async (place_id) => {
    const result = await pool.query("SELECT REVIEW.* FROM REVIEW, RESTAURANT WHERE RESTAURANT.Place_id = '" + place_id + "' and REVIEW.Rid = RESTAURANT.Rid")
    return result[0]
}

const addReview = async (place_id, userID, rate, comment) => {
    // Get Rid by place_id
    const ridResult = await pool.query("SELECT Rid FROM RESTAURANT WHERE Place_id = ?", [place_id])
    const restaurantID = ridResult[0][0].Rid

    // Insert comment into Review table
    const date = new Date();
    const year = date.getFullYear().toString()
    const month = date.getMonth() + 1 > 9 ? (date.getMonth() + 1).toString():'0' + (date.getMonth() + 1).toString()
    const day = date.getDate() > 9 ? date.getDate().toString():'0' + date.getDate().toString()
    const today = year + '-' + month + '-' + day
    const insertResult = await pool.query("INSERT INTO REVIEW (Rid, Time, Rate, Content, Uid) VALUES(?, ?, ?, ?, ?)", [restaurantID, today, rate, comment, userID])
    
    // Update rating and total rate in Restaurant table
    const countResult = await pool.query("SELECT COUNT(REVIEW.REid) FROM REVIEW, RESTAURANT WHERE RESTAURANT.Place_id = '" + place_id + "' and REVIEW.Rid = RESTAURANT.Rid")
    console.log(countResult[0][0]['COUNT(REVIEW.REid)'])
    return insertResult[0].insertId
}

module.exports = {
    getReviews,
    addReview,
}