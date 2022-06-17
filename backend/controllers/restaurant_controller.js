const axios = require('axios');
const jsSHA = require('jssha');

async function getPosition (station) {
	var longtitude = null
	var latitude = null

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
	
	await axios.get("https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/Station/TRTC?$format=json&$filter=StationName/En eq '" + station + "'", {
		headers: getAuthorizationHeader(),
	})
	.then(function(response){
		latitude = response.data[0].StationPosition.PositionLat
		longtitude = response.data[0].StationPosition.PositionLon
	});

	return [latitude, longtitude]
}

const getRestaurantsNearStation = async (req, res) => {
	const { keyword, station } = req.query;
	//let [latitude, longtitude] = await getPosition(station)
	let [latitude, longtitude] = [25.042025, 121.508175]

	var config = {
		method: 'get',
		url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longtitude + '&radius=500&keyword=' + encodeURIComponent(keyword) + '&language=zh-TW&key=AIzaSyDy-ncnSDLOJlt_3nqom7swxEfaV4ogfIY',
		headers: { }
	};
		  
	await axios(config)
	.then(function (response) {
		res.status(200).json(response.data)
	})
	 .catch(function (error) {
	 	// console.log(error);
		res.status(400).json(error)
	});

	/* 
	res.status(200).json({ count: collectCount }); */
};

const getRestaurantDetail = async (req, res) => {
	const { place_id } = req.params;

	var config = {
		method: 'get',
		url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&language=zh-TW&key=AIzaSyDy-ncnSDLOJlt_3nqom7swxEfaV4ogfIY',
		headers: { }
	};
		  
	await axios(config)
	.then(function (response) {
		res.status(200).json(response.data)
	})
	 .catch(function (error) {
	 	// console.log(error);
		res.status(400).json(error)
	});
};

module.exports = {
	getRestaurantsNearStation,
	getRestaurantDetail,
};