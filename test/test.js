var os = require('os');
var path = require('path');
var npmi = require('..');

describe('npmi', function () {
  this.slow('15s');
  this.timeout('30s'); // increase timeout
  it('should install kevoree-node-javascript:latest', function (done) {
    npmi(
      {
        name: 'kevoree-node-javascript',
        version: 'latest',
        path: os.tmpdir(),
      },
      function (err) {
        if (err) {
          throw err;
        } else {
          done();
        }
      }
    );
  });

  it('should install kevoree-node-javascript:0.6.0', function (done) {
    npmi(
      {
        name: 'kevoree-node-javascript',
        version: '0.6.0',
        path: os.tmpdir(),
      },
      function (err) {
        if (err) {
          throw err;
        } else {
          done();
        }
      }
    );
  });

  it('should install npmi in os.tmpdir()', function (done) {
    npmi(
      {
        name: path.resolve(process.cwd()),
        path: os.tmpdir(),
        forceInstall: true,
      },
      function (err) {
        if (err) {
          throw err;
        } else {
          done();
        }
      }
    );
  });
});
