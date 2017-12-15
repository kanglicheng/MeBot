/**
 * Created by chlee1001 on 2017.10.17.
 */
module.exports = function (app, fs) {
	// User Modules
	var main = require('./functions/main'); // 처음으로..
	var menu = require('./functions/menu'); // 메뉴..
	var tran;
	// 키보드
	app.get('/keyboard', function (req, res) {
		fs.readFile(__dirname + "/../public/data/" + "keyboard.json", 'utf8', function (err, data) {
			console.log(data);
			res.end(data);
		});
	});

	// 메시지
	app.post('/message', function (req, res) {
		const _obj = {
			user_key: req.body.user_key,
			type: req.body.type,
			content: req.body.content
		};
		console.log(_obj.content)

		if (_obj.content == '시작하기') { // 시작하기
			var result = '';
			var gostart = require('./functions/goStart');
			gostart.start(function (result) {

				result += '\n안녕 나는 미봇이야!!(씨익)(신나)\n내가 처음이면 처음화면으로 돌아가서 사용방법을 눌러봐!!(제발)\n';

				let message = {
					"message": {
						"text": result
					},
					"keyboard": {
						"type": "buttons",
						"buttons": [
							'학식',
							"식당추천",
							"날씨 정보",
							'학번 QR코드',
							"번역기",
							"사진분석",
							'무당이 시간표',
							"처음으로"
						]
					}
				};

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(message));
			});

		} else if (_obj.content == '사용방법') {
			let message = {
				"message": {
					"text": "나는 미봇.. 도움말은 준비중",
					"photo": {
						"url": 'http://kakao.mebot.kro.kr/MeBot/public/images/tmp.jpg',
						"width": 640,
						"height": 640
					}
				},

				"keyboard": {
					"type": "buttons",
					"buttons": [
						"시작하기",
						"사용방법",
						"문의하기"
					]
				}
			};
			// 카톡으로 전송
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == '문의하기') {
			var qna = require('./qna')();

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(qna));

		} else if (_obj.content == "학식") {
			let message = {
				"message": {
					"text": '식당을 골라주세요! (컴온)'
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"비전타워",
						"창조관",
						"아름관",
						"돌아가기"
					]
				}
			};
			// 카톡으로 전송
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == "비전타워") {
			var result = '';
			var meal = require('./functions/meal/school/mealVisionTower');
			meal.visionTower(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == "창조관") {
			var result = '';
			var meal = require('./functions/meal/school/mealCreator');
			meal.creator(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == "아름관") {
			var result = '';
			var meal = require('./functions/meal/school/mealBeautiful');
			meal.beautiful(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == '식당추천' || _obj.content == '더 추천받기') {
			var result = '';
			var meal = require('./functions/meal/restaurantRandom');
			meal.restaurant(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == '식당 리스트') {
			let message = {
				"message": {
					"text": "가천대 주변의 100개의 식당 리스트",
					"message_button": {
						"label": '여기야',
						"url": 'http://kakao.mebot.kro.kr:9000/list'
					}
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						'더 추천받기',
						'식당 리스트',
						'돌아가기'
					]
				}
			};
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == '사진분석') {
			let message = {
				"message": {
					"text": '방법을 모르신다면 <<사진분석 예시>> 버튼을 눌러주세요!\n\n text로 변환하고 싶은 사진을 보내주세요'
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"사진분석 예시",
						"주의사항",
						"돌아가기"
					]
				}
			};

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == '사진분석 예시') {

			let message = {
				"message": {
					"photo": {
						"url": 'http://kakao.mebot.kro.kr/sb/사진변환.jpg',
						"width": 640,
						"height": 1200
					}
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"사진분석",
						"주의사항",
						'돌아가기'
					]
				}
			};

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == '주의사항') {

			let message = {
				"message": {
					"photo": {
						"url": 'http://kakao.mebot.kro.kr/sb/주의사항.jpg',
						"width": 640,
						"height": 1200
					}
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"사진분석",
						"사진분석 예시",
						'돌아가기'
					]
				}
			};

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == '날씨 정보') {
			let message = {
				"message": {
					"text": "원하는 날씨 정보를 눌러줘"
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						'현재 날씨',
						'오늘 날씨',
						'내일 날씨',
						'돌아가기'
					]
				}
			};
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == '현재 날씨' || _obj.content == '미세먼지') {
			var result = '';
			var ww = require('./functions/weather/currentWeather');
			ww.weather(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == '오늘 날씨') {
			var result = '';
			var ww = require('./functions/weather/todayWeather');
			ww.todayWeather(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == '내일 날씨') {
			var result = '';
			var ww = require('./functions/weather/tomorrowWeather');
			ww.tomorrowWeather(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == '무당이 시간표') {
			let message = {
				"message": {
					"photo": {
						"url": 'http://kakao.mebot.kro.kr/sb/무당이.jpg',
						"width": 640,
						"height": 1200
					}
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						'학식',
						"식당추천",
						"날씨 정보",
						'학번 QR코드',
						"번역기",
						"사진분석",
						'무당이 시간표',
						"처음으로"
					]
				}
			};

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));
		} else if (_obj.content == '메뉴얼' || _obj.content == '메뉴' || _obj.content == '돌아가기' || _obj.content == '/취소') {

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(menu()));

		} else if (_obj.content == '처음으로') {

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(main()));

		} else if (_obj.content == '학번 QR코드') {
			let message = {
				"message": {
					"text": "학번을 찾고 싶으면 '학번 201700000' 라고 입력해!!"
				}
			};
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content.indexOf('학번 20') > -1) {
			var result;
			var content = _obj.content.replace('학번 ', '');
			var qr = require('./functions/QR_studentID');
			qr.studentID(content, function (result) {
				console.log(result);
				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == '번역기') {
			let message = {
				"message": {
					"text": '번역해주고싶은 언어를 골라주세요!'
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"한글 to 영어",
						"영어 to 한글",
						'돌아가기'
					]
				}
			};
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == '한글 to 영어') {
			tran = _obj.content;
			let message = {
				"message": {
					"text": "안녕 나는 한글 -> 영어 번역기야! 사용방법 !말"
				}
			};
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == '영어 to 한글') {
			tran = _obj.content;
			let message = {
				"message": {
					"text": "안녕 나는 영어 -> 한글 번역기야! 사용방법 !말"
				}
			};
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content.indexOf('!') > -1) {
			var result;
			var content = _obj.content.replace('!', '');
			if (tran == '한글 to 영어') {
				var translate = require('./functions/translateKE');
				translate.papago(content, function (result) {
					console.log(result);

					res.set({
						'content-type': 'application/json'
					}).send(JSON.stringify(result));
				})
			} else if (tran == '영어 to 한글') {
				var translate = require('./functions/translateEK');
				translate.papago(content, function (result) {
					console.log(result);

					res.set({
						'content-type': 'application/json'
					}).send(JSON.stringify(result));
				})
			}
		} else if (_obj.content.indexOf('http') > -1) {
			var result;
			var content = _obj.content;
			var picture = require('./functions/cloudVision/picture');

			picture.cloud(content, function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else {
			let message = {
				"message": {
					"text": "준비중이야"
				}
			};
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(main()));

			/*
			var result;
			var content = _obj.content;
			var simsimi = require('./functions/simsimi/test');
			simsimi.test(content, function (result) {
			console.log(result);

			// 카톡으로 전송
			res.set({
			'content-type': 'application/json'
			}).send(JSON.stringify(result));
			})
			 */
		}
	});

	app.post('/friend', (req, res) => {
		const user_key = req.body.user_key;
		console.log(`${user_key}님이 채팅방에 참가했습니다.`);

		res.set({
			'content-type': 'application/json'
		}).send(JSON.stringify({
				success: true
			}));
	});

	app.delete ('/chat_room/:user_key', (req, res) => {
		user_key = req.params.user_key;
		console.log(`${user_key}님이 채팅방에서 나갔습니다.`);

		res.set({
			'content-type': 'application/json'
		}).send(JSON.stringify({
				success: true
			}));
	});
}