 /**
  * Created by chlee1001 on 2017-12-19.
  */
 module.exports = function () {
 	let message = {
 		"message": {
 			"text": '원하는 기능을 선택해주세요!!(씨익)(신나)'
 		},
 		"keyboard": {
 			"type": 'buttons',
 			"buttons": [
 				'식당 추천',
 				'날씨 정보',
				'돌아가기'
 			]
 		}
 	};

 	return message;
 }