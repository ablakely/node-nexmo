# node-nexmo (nexmoapi)

This project is a client library for the [Nexmo SMS Wholesale API](http://nexmo.com) REST interface.

# Library API
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

## Major Overhaul 1.x.x & 2.x.x
Version 3.x.x of nexmoapi is a complete recode of the library.  With this overhaul comes many new features:
* More effecient!
* Message objects.
* Improved usablity.

Even with all these changes, 3.x.x retains backwards compatibility with 2.x.x and 1.x.x.

## Message Objects
3.x.x implements message objects which are constructed by:
```javascript
var NexmoClient = require("nexmoapi");

var client = new NexmoClient({
	key:	'',
	secret:	''
});

// The reciepts API is also fixed in 3.x.x and can be used as 
// like such:
//
// The publicUrl is used to determine what port and host to 
// bind to for the HTTP server.  It is passed as the callback
// url (if none is given and a receiptsSever exists).
// You may also directly specify the port and host to bind to
// if prefered.

client.recieptsServer({
	publicUrl:	'http://domain.tld:port/reciepts'
});

// Create a message object.

var msg = new client.Message({
	from:		'',
	to:			'',
	body:		'Hello World!'
});

// You may also set message values like such...
msg.to = "+15550005555";

// To send the message just do:
msg.send(function(err, msg) {
	if (err) {
		console.error(err);
	}

	console.log(msg);
});
```