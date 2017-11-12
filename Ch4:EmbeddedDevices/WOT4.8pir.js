var Gpio = require('onoff').Gpio,									//onoff library will listen to both rising and falling hardware interrupts 
	sensor = new Gpio(17, 'in', 'both');							//Create a sensor object initialized on Pin 17 'both' means you want to handle both and falling interrupt edges


sensor.watch(function(err, value)									//Listen for state changes on pin 17; if a change is detected, the anonymous callback function will be called with the new value
{
	if (err)
	{
		exit(err);
	}
	
	console.log(value ? 'there is some one!' : 'not anymore!');
});

function exit(err)
{
	if (err);
	{
		console.log('An error occurred: ' + err);
	}

	sensor.unexport();
	console.log('Bye Now!');
	process.exit();
}

process.on('SIGINT', exit);