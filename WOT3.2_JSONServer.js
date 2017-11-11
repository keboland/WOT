var http = require("http");
var port = 8686;

function randomInt (low, high)
{
	return Math.floor(Math.random() * (high - low) + low);
}

http.createServer(function(req,res)
{
	console.log('New Incoming Client Request For ' + req.url);
	res.writeHeader(200, {'Content-Type': 'application/json'});		//Sets response to be in JSON format

	switch(req.url)													//Read the request URL and provide responses accordingly
	{
		case '/temperature':
		{
			res.write('{"temperature" :' + randomInt(1,40) + '}');	//Write the temperature result as JSON
			break
		}
		case '/light':
		{
			res.write('{"light" :' + randomInt(1,100) + '}');
			break;
		}
		default:
		{
			res.write('{"Hello" : "World"}');
		}
	}
}).listen(port);
console.log('Server listening on http://localhost:' + port);