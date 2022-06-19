const axios = require('axios');
const jsSHA = require('jssha');
const { pool } = require('./mysqlcon');

const getAuthorizationHeader = function() {
	var AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
	var AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';

	var GMTString = new Date().toGMTString();
	var ShaObj = new jsSHA('SHA-1', 'TEXT');
	ShaObj.setHMACKey(AppKey, 'TEXT');
	ShaObj.update('x-date: ' + GMTString);
	var HMAC = ShaObj.getHMAC('B64');
	var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

	return { 'Authorization': Authorization, 'X-Date': GMTString};
}

axios.get("https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/Station/TRTC?$format=json&", {
	headers: getAuthorizationHeader(),
})
.then(async function(response){
	const conn = await pool.getConnection();
	await conn.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
	await conn.beginTransaction();
	try {
		await conn.query("SELECT * FROM STATION")
		for (let index = 0; index < response.data.length; index++) {
			await conn.query(`INSERT INTO STATION (Code, Name_zh_tw, Name_en, Latitude, Longitude) VALUES (?, ?, ?, ?, ?)`
							  , [response.data[index].StationID, response.data[index].StationName.Zh_tw, response.data[index].StationName.En, response.data[index].StationPosition.PositionLat, response.data[index].StationPosition.PositionLon])
		}
	  	await conn.commit();
	} catch (error) {
	  	conn.rollback();
	  	console.log(error)
	} finally {
	  	await conn.release();
		process.exit()
	}
});
