/* this script has been replaced with account.js and sms.js */

var nexmo	= require('../lib/nexmo.js').Nexmo,
    username	= null,
    password    = null,
    from	= null,
    to		= null,
    text	= 'Hello World!';

var s = new nexmo(username, password);

s.send(from, to, text, function(err, sucuess) {
	if (sucuess) {
		console.log('msgid: ' + sucuess.id);
	}
	if (err) {
		console.log(err);
	}	
});
