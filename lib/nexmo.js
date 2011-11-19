/*
 * nexmo.js
 *
 * Written by Aaron Blakely <aaron@ephasic.org>
 * See: LICENSE
 */
 
var http	= require('request'),
	url		= require('url');


function nexmo(username, password, key, secret)
{
	this.username	= username;
	this.password	= password;

	if (key && secret) {
		this.key	= key;
		this.secret	= secret;
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
	
};

exports.Nexmo = nexmo;
