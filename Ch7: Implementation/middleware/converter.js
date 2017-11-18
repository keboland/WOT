//REquires the two modules and instantiate a MessagePack encoder
var msgpack = require('msgpack5'),
	encode = msgpack.encode,
	json2html = require('node-json2html');

//In Express a Middleware is usually a function returning a function
module.exports = function()
{
	return function(req, res, next)
	{
		console.info('Representation Converter Middleware Called!');

		//Check if the previous middleware left a result for you in req.results
		if (req.results)
		{
			//Read the Client Request Header and Check if the client Requested JSON
			switch (req.accepts(['json', 'html', 'application/x-msgpack']))
			{
				case 'html':
				{
          			console.info('HTML representation selected!');
          			var transform = {'tag': 'div', 'html': '${name} : ${value}'};
          			res.send(json2html.transform(req.result, transform)); //#E
          			return;
          		}
        		case 'application/x-msgpack':
        		{
          			console.info('MessagePack representation selected!');
          			res.type('application/x-msgpack');
          			res.send(encode(req.result)); //#F
          			return;
          		}
          		//For all other formats default to JSON
        		default: //#G
        		{
          			console.info('Defaulting to JSON representation!');
          			res.send(req.result);
					return;
				}
			}
		}
		else
		{
			//If no result was present in req.result call next middleware
			next();
		}
	}
};