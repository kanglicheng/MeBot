/**
 * Created by chlee1001 on 2017.11.08.
 */
module.exports.visionTower = function (callback) {

	var request = require("request");
	require('date-utils');

	const token = '9SuhlhFnlYnT9IVRKIHsLGaC42DbXhA6pAfsyNpvhhJ9OS8l2v';
	var dDate = new Date();
	var today = dDate.toFormat('YYYY-MM-DD');
	console.log(today);
	var options = {
		url: 'https://bds.bablabs.com:443/openapi/v1/campuses/iaSfflZqCl/stores/MjEzMTc3NDg5?date=' + today,
		method: 'GET',
		headers: {
			'accesstoken': token,
			'babsession': 'meal'
		}
	};

	request.get(options, function (error, response, body) {

		if (!error && response.statusCode == 200) { //request 성공했으면..
			//json 파싱
			var objBody = JSON.parse(response.body);
			//필요한 부분만 추출
			var name = objBody.store.name;
			var menuDescription = objBody.store.menus[0].description;
			var menuName1 = objBody.store.menus[0].name;

			if (menuName1 == '식당에서 메뉴를 업로드하지 않았습니다.') {
				result = name + '\n' + menuName1;
				console.log(result);

				//카톡에 메시지 전송
				return callback(result);

			} else {
				var menuDetail1 = objBody.store.menus[1].description;
				var menuName2 = objBody.store.menus[2].name;
				var menuDetail2 = objBody.store.menus[2].description;

				result = name + '\n' + menuDescription + '\n' + menuName1 + '\n' + menuDetail1 + '\n\n' + menuName2 + '\n' + menuDetail2;
				console.log(result);

				return callback(result);

			}
		} else {
			console.log('error = ' + response.statusCode);
			var message = response.statusCode

				//카톡에 메시지 전송 에러 메시지
				return callback(message);
		}
	});
}