const axios = require('axios');
const jsSHA = require('jssha');

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

axios.get("https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/Station/TRTC?$format=json&$filter=StationName/En eq 'Ximen'", {
	headers: getAuthorizationHeader(),
})
.then(function(response){
	// console.log(Object.keys(response.data[0].StationName));
    for (let index = 0; index < response.data.length; index++) {
        console.log(response.data[index]);
        /* console.log(response.data[index].StationID);
        console.log(response.data[index].StationName.Zh_tw);
        console.log(response.data[index].StationName.En);
        console.log(response.data[index].StationPosition.PositionLon);
        console.log(response.data[index].StationPosition.PositionLat); */
    }
});
