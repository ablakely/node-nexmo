var testcase	 = require('nodeunit').testCase,
    url			 = require('url'),
    request      = require('request'),
    nexmo		 = require('../index.js').Nexmo;
    nexmoReceipt = require('../index.js').NexmoReceipts;

/*
  HTTPS:
   var s = new nexmo(key, secret, true);
*/


module.exports = testcase({
	setUp: function(callback)
	{
		console.log('setting up...');
		callback();
	},
	
	reciptEmit: function(test)
	{
		test.expect(9);
		
		nexmoReceipt.on('failed', function(msg)
		{
			test.notEqual(msg, null);
			test.equals(msg.to, '0011234567890');
			test.equals(msg['network-code'], 'ABC');
			test.equals(msg['message-id'], 'ABC123');
			test.equals(msg.msisdn, 'XYZ');
			test.equals(msg.scts, '1101181426');
			nexmoReceipt.stop();
		});
		
		nexmoReceipt.start();
		
		var uri = url.format({
			protocol: 'http:',
			hostname: 'localhost',
			port:     4032,
			pathname: '/receipts',
			query: {
				status: 'FAILED',
				to:     '0011234567890',
				'network-code': 'ABC',
				messageId: 'ABC123',
				msisdn: 'XYZ',
				scts: '1101181426'
			}
		});
		
		request.get({
			uri: uri,
		}, function(err, res, body) {
			test.equal(error, null);
			test.notEqual(res, null);
			test.equal(res.statusCode, 200);
			test.done();
		});
	}
});

