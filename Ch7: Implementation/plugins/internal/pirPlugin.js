var resources = require('./../../resources/model');

var interval, sensor;
var model = resources.pi.sensors.pir;
var pluginName = resources.pi.sensors.pir.name;
var localParams = {'simulate': true, 'frequency': 2000};

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
	var Gpio = require('onoff').Gpio;
	sensor = new Gpio(model.gpio, 'in', 'both');		//Configure the GPIO pin to which the PIR sensor is connected
	sensor.watch(function (err, value)
	{
		if (err)
		{
			exit(err);
		}

		model.value = !!value;
		showValue();
	});
	console.info('Hardware %s Sensor Started', pluginName);
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