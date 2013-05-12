# node-nexmo (nexmoapi)

This project is a client library for the [Nexmo SMS Wholesale API](http://nexmo.com) REST interface.

# Usage
Here's a basic demonstration of how to use this library to send a text message.

```javascript
var NexmoClient = require("nexmoapi");

/* Create our client */
var client = new NexmoClient({
	key:	'',
	secret:	''
});

/* Send a SMS */
client.send(from, to, 'message', function(err, msg) {
	if (err) {
		console.error(err);
	}

	console.log(msg);
});
```

