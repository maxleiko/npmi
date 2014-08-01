var npmi = require('../npmi');
var os = require('os');
var path = require('path');

npmi({
	name: path.resolve(__dirname, 'submodule'),
	path: path.resolve(os.tmpdir(), 'npmi_test_install'),
	localInstall: true
}, function (err) {
	if (err) {
        console.log('Test failed');
        throw err;
    }
});