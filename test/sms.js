var nexmo	= require('../lib/nexmo.js').Nexmo,
	key		= '',
	secret  = '',
	from    = '',
	to      = '',
    text	= 'Hello World!';

var s = new nexmo(key, secret);

s.send(from, to, text, function(err, sucuess) {
	if (sucuess) {
		console.log('msgid: ' + sucuess.id);
	}
	if (err) {
		console.log(err);
	}	
});

s.search(countrycode, opt_patern, function(err, res) {
	if (err) {
		console.log(err);
	}
	
	if (res) {
		console.log(res);
	}
});
