var resources = require('./../../resources/model');

var interval, sensor;
var model = resources.pi.sensors.pir;
var pluginName = resources.pi.sensors.pir.name;
var localParams = {'simulate': false, 'frequency': 2000};

exports.start = function(params)						//Starts the plugin which 													//should be accessible fromther Node.js files so you export them
{														//
	localParams = params;

	if (localParams.simulate)
	{
		simulate();
	}
	else 
	{
		connectHardware();
	}
};

exports.stop = function()								//Stops the plugin
{
	if (localParams.simulate)
	{
		clearInterval(interval);
	}
	else
	{
		sensor.unexport();
	}

	console.log('%s Plugin Stopped', pluginName);
};

function connectHardware()
{
	var sensorDriver = require('node-dht-sensor');						//Initialize driver for DHT22 on GPIO 12
	var sensor = 
	{
		initialize: function()
		{
			return sensorDriver.initialize(22, model.temperature.gpio);
		},
		read: function()
		{
			var readout = sensorDriver.read();
			model.temperature.value = parseFloat(readout.temperature.toFixed(2));
			model.humidity.value = parseFloat(readout.humidity.toFixed(2));
			showValue();

			setTimeout(function()
			{
				sensor.read();
			}, localParams.frequency);
		}
	};
};

function simulate()
{
	interval = setInterval (function ()
	{
		model.value = !model.value;
		showValue();
	}, localParams.frequency);
	console.log('Simulated %s Sensor Started!', pluginName);
};

function showValue()
{
	console.info(model.value ? 'There is Someone!': 'Not Anymore!');
};