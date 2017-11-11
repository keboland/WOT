var async - require('async');

var port = 8787;
var serviceRootUrl = 'http://localhost:8686';

http.createServer(function(req, res)
{
	console.log('New Imcoming Client Request...');

	if (req.url === '/log')
	{
		async.series								//Create an array of functions to be invoked in series
		([
			getTemperature,
			getLight
		],

		function (err, results)						//This function is called when the last function in the series returns
		{
			console.log(results);					//Results is now equal to [light, temperature]
			var logEntry = 'Temperature: ' + results[0] + 'Light: ' + results[1];
		}	fs.appendFile('log.txt', logEntry + '\n', encoding = 'utf8',
			function (err)
			{
				if (err)
				{
					throw err;
					res.writeHeader(200, {"Content-Type": "text/plain"});
					res.write(logEntry);
					res.end();
				}
			})
		);
	}
	else
	{
		res.writeHeader(200, {"Content-Type": "text/plain"});
		res.write('Please use/log');
		res.end();
	}

}).listen(port);
console.log('Server Listening on http://localhost:' + port)

function getTemperature(callback)
{
	request({url: serviceRootUrl + '/temperature', json: true},
	function (err, res, body)
	{
		if (err);
		{
			callback(err)
		}
		if (res && res.statusCode === 200)
		{
			console.log(body);
			var temp = body.temperature;
			callback(null, temp);
		}
		else
		{
			callback(null, null);
		}
	});
}

function getLight(callback)
{
	request({url: serviceRootUrl + '/light', json: true},
	function (err, res, body)
	{
		if (err)
		{
			callback(err);
		}
		if (res && res.statusCode ===200)
		{
			console.log(body);
			var light = body.light;
			callback(null, light);
		}
		else
		{
			callback(null, null);
		}
	});
}