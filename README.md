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

# Major Overhaul 1.x.x & 2.x.x
Version 3.x.x of nexmoapi is a complete recode of the library.  With this overhaul comes many new features:
* More effecient!
* Message objects.
* Improved usablity.
Even with all these changes, 3.x.x retains backwards compatibility with 2.x.x and 1.x.x.


