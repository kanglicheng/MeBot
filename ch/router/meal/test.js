var https = require('https');



const token = 'eKQSrvdomvDQ0LeYLjsMSrzk8HdZS6kevWXUDW7yn5Cgz37BgF';


var options = {

	host: 'bds.bablabs.com',

	port: 443,

	path: '/openapi/v1/campuses',

	method: 'GET',

	headers: {

		'accesstoken': token,

		'babsession': 'bot'

	}

};



var req = https.get(options, function (res) {

		var resData = '';

		res.on('data', function (chunk) {

			resData += chunk;

		});



		res.on('end', function () {

			console.log(resData);

		});

	});



req.on('error', function (err) {

	console.log('err: ' + err.message);

});