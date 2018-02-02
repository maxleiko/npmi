/**
 * Created with IntelliJ IDEA.
 * User: leiko
 * Date: 30/01/14
 * Time: 10:28
 */
declare function npmi(options: npmi.IOptions, callback: npmi.ICallback): void;
declare module npmi {
    const NPM: INPM;
    const LOAD_ERR = "NPM_LOAD_ERR";
    const INSTALL_ERR = "NPM_INSTALL_ERR";
    const VIEW_ERR = "NPM_VIEW_ERR";
    const NPM_VERSION: string;
    interface INPM {
        load(cb: Function): any;
        load(options: IConfigOptions, cb?: Function): any;
        GLOBAL_NPM_PATH: string;
        GLOBAL_NPM_BIN: string;
    }
    interface ICallback extends Function {
        (err?: any, result?: any): any;
    }
    interface IOptions {
        /**
         * If you don't specify a name in options, but just a path, npmi will do the same as if you were at this path in a terminal and executing npm install
         Otherwise, it will install the module specified by this name like npm install module-name does.
         */
        name?: string;
        pkgName?: string;
        /**
         * Desired version for installation
         */
        version?: string;
        /**
         * Desired location for installation (note that if you specified /some/foo/path, npm will automatically create a node_modules sub-folder at this location, resulting in /some/foo/path/node_modules). So don't specify the node_modules part in your path
         */
        path?: string;
        /**
         * If true, npmi will install options.name module even though it has already been installed.
         If false, npmi will check if the module is already installed, if it is, it will also check if the installed version is equal to options.version, otherwise, it will install options.name@options.version
         */
        forceInstall?: boolean;
        /**
         * Allows npmi to install local module that are not on npm registry. If, you want to install a local module by specifying its full path in options.name, you need to set this to true.
         */
        localInstall?: boolean;
        /**
         * This object is given to npm and allows you to do some fine-grained npm configurations.
         It is processed by npm like command-line arguments but within an Object map (npm-config)
         */
        npmLoad?: IConfigOptions;
        savedPrefix?: string;
    }
    interface IConfigOptions {
        loglevel?: 'silent';
    }
}
export = npmi;
