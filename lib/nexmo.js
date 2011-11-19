/*
 * nexmo.js
 *
 * Written by Aaron Blakely <aaron@ephasic.org>
 * See: LICENSE
 */
 
var http    = require('request'),
    url     = require('url');


function nexmo(username, password, key, secret)
{
	this.username	= username;
	this.password	= password;
	if (key && secret) {
		this.key	    = key;
		this.secret	    = secret;
	}
}

nexmo.prototype = {
	send: function(from, to, text, callback)
	{
		var uri = url.format({
			protocol:	'http:',
			host:		'reset.nexmo.com',
			pathaname:	'/sms/json',
			query: {
				username: this.username,
				password: this.password,
				from:	  from,
				to:       to,
				text:     text
			}
		});
		
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
			pathname: '/account/get-ballace/' + this.key + '/' + this.secret,
		});
		
		http.get({
			uri: uri,
			headers: {
				Accept: 'application/json'
			}
		}, function(err, res, body) {
			if (err || res.statusCode !== 200) {
				callback(err || new Error());
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
			pathname: '/account/get-pricing/outbound' + this.key + '/' + this.secret
		});
		
		http.get({
			uri: uri,
			headers: {
				Accept: 'application/json',
			}
		}, function(err, res, body) {
			if (err || res.statusCode !== 200)
			{
				callback(err || new Error());
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
		callback(new Error('not yet implemented');
	},
	
	buy: function(ccode, msisdn, callback)
	{
		var uri = url.format({
			protocol: 'http:',
			host:     'rest.nexmo.com',
			pathname: '/number/buy/' + this.key + '/' + this.secret + '/' + ccode + '/' + msisdn
		});
		
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
	
	cancel: function(ccode, msisdn, callback)
	{
		var uri = url.format({
			protocol: 'http:',
			host:     'rest.nexmo.com',
			pathname: '/number/cancel/' + this.key + '/' + this.secret + '/' + ccode + '/' + msisdn
		});
		
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
	
};

exports.Nexmo = nexmo;
