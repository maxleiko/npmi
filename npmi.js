var npm = require('npm');

var LOAD_ERR    = 'NPM_LOAD_ERR',
    INSTALL_ERR = 'NPM_INSTALL_ERR',
    LIST_ERR    = 'NPM_LIST_ERR',
    VIEW_ERR    = 'NPM_VIEW_ERR';

/**
 * Created with IntelliJ IDEA.
 * User: leiko
 * Date: 30/01/14
 * Time: 10:28
 */
var npmInstaller = function (options, callback) {
    var name         = options.name,
        version      = options.version || 'latest',
        path         = options.path || '.',
        forceInstall = options.forceInstall || false,
        npmLoad      = options.npmLoad || {loglevel: 'silent'};

    function viewCallback(installedVersion)  {
        return function (err, view) {
            if (err) {
                err.code = VIEW_ERR;
                return callback(err);
            }

            // npm view success
            var latestVersion;
            for (var i in view) {
                latestVersion = i;
                break;
            }
            if (installedVersion === latestVersion) return callback(null);
            else npm.commands.install(path, [name+'@'+latestVersion], installCallback);
        }
    }

    function listCallback(err, list) {
        if (err) {
            err.code = LIST_ERR;
            return callback(err);
        }

        // npm list success
        if (list.dependencies[name]) {
            if (version === 'latest') {
                return npm.commands.view([name], true, viewCallback(list.dependencies[name].version));
            } else {
                if (list.dependencies[name].version === version) {
                    return callback(null);
                }
            }
        }
        // if we end-up here, it means that whether the package is not installed
        // or it is installed but with the wrong version: reinstall
        npm.commands.install(path, [name+'@'+version], installCallback);
    }

    function installCallback(err, result) {
        if (err) {
            err.code = INSTALL_ERR;
            return callback(err);
        }

        // npm installed name@version in path successfully
        return callback(null, result);
    }

    function loadCallback(err) {
        if (err) {
            err.code = LOAD_ERR;
            return callback(err);
        }

        // npm loaded successfully
        if (forceInstall) {
            // reinstall package module
            npm.commands.install(path, [name+'@'+version], installCallback);

        } else {
            // check if package is installed and 
            npm.commands.list([name], true, listCallback);
        }
    }

    npm.load(npmLoad, loadCallback);
}

npmInstaller.LOAD_ERR    = LOAD_ERR;
npmInstaller.INSTALL_ERR = INSTALL_ERR;
npmInstaller.LIST_ERR    = LIST_ERR;
npmInstaller.VIEW_ERR    = VIEW_ERR;

module.exports = npmInstaller;