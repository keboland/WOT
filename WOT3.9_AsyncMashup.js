var http = require('http'),
	request = require('request'),
	fs = require('fs');

var serviceRootURL = 'http://localhost:8686';

http.createServer(function(req,res)
{
	console.log('New Incoming Client Request...');

	if(req.url === '/log')
	{
		getTemperature(res);									//Get the temperature and start the chain of calls
	}
	else
	{
		res.writeHeader(200, {"Content-Type": "text/plain"});
		res.write('Please Use /log');
		res.end();
	}
}).listen(8787);

function getTemperature(res)
{
	request({url: serviceRootUrl + '/temperature', json: true}, function (err, resp, body) 
	{
		if (err)
		{
			throw err;
		}
		if (resp.statusCode === 200)
		{
			console.log(body);
			var temp = body.temperature;
			getLight (res, temp);		//Once the callback for temperature has been called, proceed with calling the getLight function
		}
	});
}

function getLight(res, Temp)
{
	request({url: serviceRootUrl + '/light', json: true}, function (err, resp, body)
	{
		if (err)
		{
			throw err;
		}
		if (statusCode === 200)
		{
			console.log(body);
			var light = body.light;
			logValuesReply(res, temp, light)		//Then call the named function to log values
		}
	});
}

function logValuesReply(res, temp, light)
{
	var logEntry = 'Temperature: ' + temp + 'Light:' + light;
	fs.appendFile('log.txt', logEntry + '\n', encoding = 'utf8', function (err)
	{
		if (err)
		{
			throw err;
		}
		res.writeHeader(200, {"Content-Type": "text/plain"});
		res.write(logEntry);
		res.end();
	});
}