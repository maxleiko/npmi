var npmInstaller = require('./../npm-installer');
var path = require('path');


var options = {
	name: 'kevoree-group-websocket',
	version: '0.0.4',
	path: '.',
	forceInstall: false
};
npmInstaller(options, function (err, result) {
	if (err) {
		if 		(err.code === npmInstaller.LOAD_ERR) 	console.log('npm load error');
		else if (err.code === npmInstaller.INSTALL_ERR) console.log('npm install error');
		return console.log(err.message);
	}

	// installed
	console.log(options.name+'@'+options.version+' installed successfully in '+path.resolve(options.path));
});