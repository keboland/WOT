var sensorlib = require('node-dht-sensor');

sensorlib.initialize(22, 12);

var interval = setInterval(function ()			//Create an interval to read the values every two seconds
{
	read();
}, 2000);

function read()
{
	var readout = sensorLib.read();				//Read Sensor values
	console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' + 'humidity: ' + readout.humidity.toFixed(2) + '%');
};