var http = require('http');									//Import http library and assign it to created variabe http

http.createServer(function(req,res)							//Create an HTTP server and pass it a response in the form of a function to be called whenever a client sends a request
{
	res.writeHeader(200, {'Content-Type': 'text/plain'});	//Write the response beginning with the HTTP headers
	res.end('Hello World')									//22 is the sucessful status header
}).listen(8585);											//Start server on port 8585
console.log('Server Started!');