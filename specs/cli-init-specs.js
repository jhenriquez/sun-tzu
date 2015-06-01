var fs        = require('fs');
var path      = require('path');
var chai      = require('chai');
var dirtyChai = require('dirty-chai');
var cli       = require('../lib/cli');
var defaults  = require('../lib/defaults');

describe('init - Command-Line Interface', function () {
  before(function () {
  	chai.use(dirtyChai);
  	chai.should();
  });
  
  afterEach(function (done) {
    fs.unlink(path.join(process.cwd(), defaults.CONFIGURATION_FILENAME), function () {
      done();
    });
  });
  
  it('should create the sun-tzu config file on the current directoy.', function (done) {
	  cli.init({ username: 'username', key: 'some_access_key'})
      .then(function () {
        fs.readFile(path.join(process.cwd(), defaults.CONFIGURATION_FILENAME), function (err, data) {
          if (err) { done(err); }
          var values = JSON.parse(data);
          values.username.should.eql('username');
          values.key.should.eql('some_access_key');
          done();
        });
      }, function (err) {
        done(err);
      });
  });
  
  it ('should warn if the file already exists', function (done) {
    cli.init({ username: 'username', key: 'some_access_key'})
      .then(function () {
        cli.init({ username: 'username', key: 'some_access_key'})
          .then(function () {
            done(new Error('It should warn if the file exists!'));
          }, function (err) {
            err.message.should.match(/exists/);
            done();
          });
      }, function (err) {
        done(err);
      });
  });
  
  it ('should override an existing file if the "force" option is passed.', function (done) {
    this.timeout(5000);
    cli.init({ username: 'username', key: 'some_access_key'})
      .then(function () {
        cli.init({ username: 'other_username', key: 'some_other_key'}, { force: true })
          .then(function () {
            fs.readFile(path.join(process.cwd(), defaults.CONFIGURATION_FILENAME), function (err, data) {
              if (err) { done(err); }
              var values = JSON.parse(data);
              values.username.should.eql('other_username');
              values.key.should.eql('some_other_key');
              done();
            });
          }, function (err) {
            done(err);
          });
      }, function (err) {
        done(err);
      });
  });
});