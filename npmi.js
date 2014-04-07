var npm  = require('npm');
var fs   = require('fs');
var path = require('path'); 

var LOAD_ERR    = 'NPM_LOAD_ERR',
    INSTALL_ERR = 'NPM_INSTALL_ERR',
    VIEW_ERR    = 'NPM_VIEW_ERR';

/**
 * Created with IntelliJ IDEA.
 * User: leiko
 * Date: 30/01/14
 * Time: 10:28
 */
var npmi = function (options, callback) {
    callback = callback || function () {};

    var name         = options.name,
        version      = options.version || 'latest',
        installPath  = options.path || '.',
        forceInstall = options.forceInstall || false,
        localInstall = options.localInstall || false,
        npmLoad      = options.npmLoad || {loglevel: 'silent'};

    function viewCallback(installedVersion)  {
        return function (err, view) {
            if (err) {
                err.code = VIEW_ERR;
                return callback(err);
            }

            // npm view success
            var latestVersion = Object.keys(view)[0];
            if ((typeof latestVersion !== 'undefined') && (latestVersion === installedVersion)) {
                return callback();
            } else {
                npm.commands.install(installPath, [name+'@'+latestVersion], installCallback);
            }
        }
    }

    function checkInstalled() {
        // check that version matches
        fs.readFile(path.resolve(installPath, 'node_modules', name, 'package.json'), function (err, pkgRawData) {
            if (err) {
                // hmm, something went wrong while reading module's package.json file
                // lets try to reinstall it just in case
                return npm.commands.install(installPath, [name+'@'+version], installCallback);
            }

            var pkg = JSON.parse(pkgRawData);
            if (version === 'latest') {
                // specified version is "latest" which means nothing for a check
                // so we need to ask npm to give us a view of the module from remote registry
                // in order to check if it really is the latest one that is currently installed
                return npm.commands.view([name], true, viewCallback(pkg.version));

            } else if (pkg.version === version) {
                // package is installed and version matches
                return callback(null);

            } else {
                // version does not match: reinstall
                return npm.commands.install(installPath, [name+'@'+version], installCallback);
            }
        });
    }

    function installCallback(err, result) {
        if (err) {
            err.code = INSTALL_ERR;
            return callback(err);
        }

        // npm installed dependencies from package.json in path successfully
        return callback(null, result);
    }

    function loadCallback(err) {
        if (err) {
            err.code = LOAD_ERR;
            return callback(err);
        }

        // npm loaded successfully
        if (!name) {
            // just want to do an "npm install" where a package.json is obviously
            npm.commands.install(installPath, [], installCallback);

        } else if (localInstall) {
            // local install won't work with version specified
            npm.commands.install(installPath, [name], installCallback);
        } else {
            if (forceInstall) {
                // reinstall package module
                npm.commands.install(installPath, [name+'@'+version], installCallback);

            } else {
                // check if package is installed
                checkInstalled();
            }
        }
    }

    npm.load(npmLoad, loadCallback);
}

npmi.LOAD_ERR    = LOAD_ERR;
npmi.INSTALL_ERR = INSTALL_ERR;
npmi.VIEW_ERR    = VIEW_ERR;

module.exports = npmi;