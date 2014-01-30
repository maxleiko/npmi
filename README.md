npmi
====

NodeJS package that gives a simplier API to npm install (programatically installs things)

### Installation
```sh
npm install npmi
```

### Usage
```js
var npmi = require('./../npmi');
var path = require('path');


var options = {
	name: 'your-module',	// your module name
	version: '0.0.1',		// expected version [default: 'latest']
	path: '.',				// installation path [default: '.']
	forceInstall: false,	// force install if set to true (even if already installed, it will do a reinstall) [default: false]
	npmLoad: {				// npm.load(options, callback): this is the "options" given to npm.load()
		loglevel: 'silent'	// [default: {loglevel: 'silent'}]
	}
};
npmi(options, function (err, result) {
	if (err) {
		if 		(err.code === npmi.LOAD_ERR) 	console.log('npm load error');
		else if (err.code === npmi.INSTALL_ERR) console.log('npm install error');
		return console.log(err.message);
	}

	// installed
	console.log(options.name+'@'+options.version+' installed successfully in '+path.resolve(options.path));
});
```
