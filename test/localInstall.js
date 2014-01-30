var npmi = require('../npmi');

npmi({
	name: '/tmp/potato',
	version: '0.0.1',
	path: '/tmp/potato',
	forceInstall: true
}, function (err) {
	if (err) throw err;
});