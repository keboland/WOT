async.series
([
	function(callback)						//First asynchronous function call in the series
	{
		//some logic
		callback(null, 'first result');		//Triggers a call to the next function in the series
	},
	function(callback)
	{
		//Some Logic...
		callback(null, 'second result');	//Second Function in the call series
	}

],

function(err, results)						//Final function call; if all the calls in the series worked for far, results will be equal to ['first result', 'second result'] inside this function
{
	//Some logic...
});