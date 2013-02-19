var nexmo	= require('../index.js').Nexmo,
    key		= '',
    secret	= '';

var s = new nexmo(key, secret);

/*
  HTTPS:
   var s = new nexmo(key, secret, true);
*/


s.balance(function(err, res) {
	if (err) {
		console.log(err);
	}
	if (res) {
		console.log('balance: ' + res);
	}
});

s.updateSecret(newSecret, function(err, code) {
	if (err) {
		console.log(err);
	}
	
	if (code) {
		console.log(code);
	}
});

s.pricing(countrycode, function(err, code) {
	if (err) {
		console.log(err);
	}
	
	if (code) {
		// this is a bunch of JSON stuff, parse it if you need it.
		console.log('prices: ' + code);
	}
});

s.buy(countrycode, msisdn, function(err, status) {
	if (err) {
		console.log(err);
	}
	
	// returns 1 if the transaction was completed
	if (status === 1) {
		console.log('transaction complete.');
	}
});

s.cancle(countrycode, msisdn, function(err, code) {
	if (err) {
		console.log(err);
	}
	
	// acts just like buy()
	if (status === 1) {
		console.log('transaction complete.');
	}
});

