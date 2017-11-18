var express = require('express'),
	converter = require('./../middleware/converter')
	actuatorsRoutes = require('./../routes/actuators'),
	sensorRoutes = require('./../routes/sensors'),
	resources = require('./../resources/model'),			//Requires the Express framework, your routes and the model
	cors = require('cors');

var app = express();										//Creates an application with the Express framekwork; this wraps an HTTP Server

app.use(cors());											//Enable CORS support

//app.use('/pi/actuators', actuatorsRoutes);					//Binds your routes to the Express application; bind them to the /pi/actuators and /pi/sensors/
app.use('/pi/sensors', sensorRoutes);

app.get('/pi', function (req, res)
{
	res.send('This is the WoT-Pi!')							//Creates a Default Route for /pi

});

//Added last after app.get('pi') so as not to bypass other middleware
app.use(converter());

module.exports = app;