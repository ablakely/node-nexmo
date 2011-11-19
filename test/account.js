var nexmo	= require('../lib/nexmo.js').Nexmo,
    key		= '',
    secret	= '';

var s = new nexmo(null, null, key, secret);

s.balance(function(err, res) {
	if (err) {
		console.log(err);
	}
	if (res) {
		console.log('balance: ' + res);
	}
});

