var onoff = require('onoff');

var Gpio = onoff.Gpio,
	led = new Gpio(4, 'out'),								//Initialize GPIO 4 to be an output pin
	interval;

interval Gpio = setInterval(function()
{															//This interval will be called every two seconds
	var value = (led.readSync() + 1) % 2;					//Synchronously read the value of pin 4 and transform between 1 and 0
	led.write(value, function()								//Asynchronously write the new value of pin 4
	{
		console.log("Changed LED State to: " + value);
	});
}, 2000);

process.on('SIGINT', function ()							//Listen to the event triggered by Ctrl+C
{		
	clearInterval(interval);
	led.writeSync(0);
	led.unexport();											//Cleanly close the GPIO pin before closing
	console.log('Protocol Ended');
	process.exit();
});
