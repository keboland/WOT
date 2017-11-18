var httpServer = require('./servers/http'),												//Load the HTTP Server and the Model
	resources = require('./resources/model');

	var server = httpServer.listen(resources.pi.port, function ()						//Start the HTTP Server by invoking listen() on the Express application
	{
		console.info('Your WoT-Pi is up and Running on Port %s', resources.pi.port);	//Once server is started teh callback is invoked

	});

var ledsPlugin = require('./plugins/internal/ledsPlugin'),
	pirPlugin = require('./plugins/internal/pirPlugin'),
	dhtPlugin = require('./plugins/internal/DHT22SensorPlugin');

//Start all Plugins with a Parameter Object so you activate the simulate function
pirPlugin.start({'simulate': true, 'frequency': 2000});

dhtPlugin.start({'simulate': true, 'frequency':10000});
