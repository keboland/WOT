var express = require('express'),
	router = express.Router(),

	//Require and initiate an Express router to define the path to our resources
	resources = require('./../resources/model');		

//Create a new route for a GET request on all sensors and attach a callback function
router.route('/').get(function (req, res, next)			
{
	//Assign the result to a new property objcet that you pass along through middleware
	res.result = resources.pi.sensors;
	next();						//Reply with the sensor model when this route is seleceted;
});

//This route serves the passive IR sensor
router.route('/pir').get(function(req, res, next)		
{
	res.result = resources.pi.sensors.pir;
	next();
});

//This route serves the temperature sensors
router.route('/temperature').get(function(req, res, next)		
{
	res.result = resources.pi.sensors.temperature;
	next();
});

//Serves the humidity sensor
router.route('/humidity').get(function(req, res, next)	
{
	res.result = resources.pi.sensors.humidity;
	next();
});

//Export router to make it accessible for "requires" of this file
module.exports = router;								