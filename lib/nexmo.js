/*
 * nexmo.js
 *
 * Written by Aaron Blakely <aaron@ephasic.org>
 * See: LICENSE
 */
 
var http    = require('request'),
    url     = require('url');


function nexmo(key, secret)
{
	this.key		= key;
	this.secret		= secret;
}

nexmo.prototype = {
	send: function(from, to, text, callback)
	{
		var uri = url.format({
			protocol:	'http:',
			host:		'rest.nexmo.com',
			pathname:	'/sms/json',
			query: {
				username: this.key,
				password: this.secret,
				from:	  from,
				to:       to,
				text:     text
			}
		});
		
		if (text.length > 160) {
			callback(new Error('SMS(es) are limited to 160 chars.'));
		}
		
		if (!from || from.length === 0) {
			callback(new Error('from is undefined.'));
		}
		
		if (!to || to.length === 0) {
			callback(new Error('to is undefined.'));
		}
		
		if (!text || text.length == 0) {
			callback(new Error('text is undefined.'));
		}
		
		if (typeof callback !== 'function') {
			throw new Error('callback is not a function.');
		}
		
		http.post({
			uri:	uri,
		}, function(err, res, body) {
			if (err) {
				callback(err);
			} else {
				var ress = JSON.parse(body);
				if (ress.messages[0].status > 0) {
					callback(new Error(ress.messages[0]['error-text']));
				} else {
					callback(null, {
						id:	ress.messages[0]['message-id'],
						price: ress.messages[0]['message-price'],
						balance: ress.messages[0]['remaining-balance']
					});
				}
			}
		});
	},
	
	balance: function(callback)
	{
		var uri = url.format({
			protocol: 'http:',
			host:     'rest.nexmo.com',
			pathname: '/account/get-balance/' + this.key + '/' + this.secret,
		});

		if (typeof callback !== 'function') {
			throw new Error('callback is not a function.');
		}
		
		http.get({
			uri: uri,
			headers: {
				Accept: 'application/json'
			}
		}, function(err, res, body) {
			if (err || res.statusCode !== 200) {
				callback(err || new Error('status NOT OK'));
			} else {
				var ress = JSON.parse(body);
				if (ress.value) {
					callback(null, ress.value);
				} else {
					callback(new Error());
				}
			}
		});
	},
	
	pricing: function(country, callback)
	{
		var uri = url.format({
			protocol: 'http:',
			host:     'rest.nexmo.com',
			pathname: '/account/get-pricing/outbound/' + this.key + '/' + this.secret + '/' + country
		});
		
		if (!country || country.length == 0) {
			callback(new Error('country is undefined.'));
		}
		
		if (typeof callback !== 'function') {
			throw new Error('callback is not a function.');
		}
		
		http.get({
			uri: uri,
			headers: {
				Accept: 'application/json',
			}
		}, function(err, res, body) {
			if (err || res.statusCode !== 200)
			{
				callback(err || new Error('status NOT OK'));
			} else {
				var ress = JSON.parse(body);
				if (ress.country) {
					callback(null, ress);
				} else {
					callback(new Error());
				}
			}
		});
	},
	
	numbers: function(callback)
	{
		callback(new Error('not yet implemented'));
	},
	
	buy: function(ccode, msisdn, callback)
	{
		var uri = url.format({
			protocol: 'http:',
			host:     'rest.nexmo.com',
			pathname: '/number/buy/' + this.key + '/' + this.secret + '/' + ccode + '/' + msisdn
		});

		
		if (!ccode || ccode.length == 0) {
			callback(new Error('country code is undefined.'));
		}
		
		if (!msisdn || msisdn.length == 0) {
			callback(new Error('msisdn is undefined.'));
		}
		
		if (typeof callback !== 'function') {
			throw new Error('callback is not a function.');
		}
				
		http.post({
			uri: uri,
		}, function(err, res) {
			if (res.statusCode == 200) {
				callback(null, '1');
			} else if (res.statusCode == 401) {
				callback(new Error('wrong credentials'));
			} else if (res.statuseCode == 420) {
				callback(new Error('wrong parameters'));
			} else if (err) {
				callback(new Error());
			}
		});
	},
	
	cancel: function(ccode, msisdn, callback)
	{
		var uri = url.format({
			protocol: 'http:',
			host:     'rest.nexmo.com',
			pathname: '/number/cancel/' + this.key + '/' + this.secret + '/' + ccode + '/' + msisdn
		});
		
		if (!ccode || ccode.length == 0) {
			callback(new Error('country code is undefined.'));
		}
		
		if (!msisdn || msisdn.length == 0) {
			callback(new Error('msisdn is undefined.'));
		}
		
		if (typeof callback !== 'function') {
			throw new Error('callback is not a function.');
		}
		
		http.post({
			uri: uri,
		}, function(err, res) {
			if (res.statusCode == 200) {
				callback(null, 1);
			} else if (res.statusCode == 401) {
				callback(new Error('wrong credentials'));
			} else if (res.statuseCode == 420) {
				callback(new Error('wrong parameters'));
			} else if (err) {
				callback(new Error());
			}
		});
	},
	
	updateSecret: function(secret, callback)
	{
		var uri	= url.format({
			protocol:	'http:',
			host:		'rest.nexmo.com',
			pathname:	'/account/settings/' + this.key + '/' + this.secret + '?newSecret=' + secret 
		});
		
		if (secret.length > 8) {
			callback(new Error('secret max is 8'));
		}
		if (secret.length == 0) {
			callback(new Error('secret is undefined.'));
		}
		
		if (typeof callback !== 'function') {
			throw new Error('callback is not a function.');
		}
		
		http.post({
			uri: uri,
		}, function(err, res, body) {
			if (err || res.statusCode !== 200) {
				console.log('scode: ' + res.statusCode);
				callback(err || new Error('status NOT OK'));
			} else {
				var ress = JSON.parse(body);
				if (ress.api-secret) {
					this.secret = ress.api-secret;
					callback(null, ress);
				}
			}
		});
	},
	
	search: function(country_code, opt_pattern, callback)
	{
		var a;
		if (typeof country_code !== 'string' || country_code.length == 0) {
			callback(new Error('country code is required'));
		}
		
		if (typeof opt_pattern === 'function') {
			a = opt_pattern;
			opt_pattern = undefined;
		} else {
			if (typeof callback !== 'function') {
				throw new Error('callback is undefined.');
			}
		}
		
		a = callback;
		
		var uri = url.format({
			protocol:	'http:',
			host:		'rest.nexmo.com',
			pathname:	'/number/search/'+this.key + '/' + this.secret + '/' + country_code+((opt_pattern) ? '?pattern='+opt_pattern : '')
		});
		
		http.get({
			uri: uri,
			headers: {
				Accept: 'application/json'
			}
		}, function(err, res, body) {
			if (err || res.statusCode !== 200) {
				callback(err || new Error('status NOT OK'));
			} else {
				var ress = JSON.parse(body);
				if (ress) {
					callback(null, ress);
				} else {
					callback(new Error());
				}
			}
		});
	},
	
	
};

exports.Nexmo = nexmo;
