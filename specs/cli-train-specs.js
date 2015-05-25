var fs        = require('fs');
var path      = require('path');
var cli       = require('../lib/cli');
var chai      = require('chai');
var dirtyChai = require('dirty-chai');

describe('tain - Command-Line Interface', function () {
  var languageDir = path.join(process.cwd(),'javascript');
  var configFile  = path.join(process.cwd(), cli.CONFIGURATION_FILENAME);
  
  before(function (done) {
    chai.use(dirtyChai);
    chai.should();
    
    cli.init({
      username: 'specs_user',
      access_key: 'specs_access_key',
      language: 'javascript'
    })
    .then(function () { done(); }, done);
  });
  
  after(function (done) {
    fs.unlink(configFile, function () { done(); });
  });
  
  afterEach(function () {
    try {
      fs.rmdirSync(languageDir);
    } catch (err) { /* Something wrong, not sure if I care. :p */}
  });
  
  it('should create a folder for the language if it does not exist', function (done) {
    fs.stat(languageDir, function (err, pathInfo) {
      chai.expect(err).to.be.ok();
      err.code.should.eql('ENOENT');
      
      cli.train({
        language: 'javascript'
      })
      .then(function () {
        fs.stat(languageDir, function (err, pathInfo) {
          chai.expect(err).to.not.be.ok();
          chai.expect(pathInfo).to.be.ok();
          pathInfo.isDirectory().should.be.ok();
          done();
        });
      }, function (err) {
        done(err);
      });
    });
  });
  
  it('should fall back to configuration (default language) if none is provided', function (done) {
    fs.stat(languageDir, function (err, pathInfo) {
      chai.expect(err).to.be.ok();
      err.code.should.eql('ENOENT');
      
      cli.train()
      .then(function () {
        fs.stat(languageDir, function (err, pathInfo) {
          chai.expect(err).to.not.be.ok();
          chai.expect(pathInfo).to.be.ok();
          pathInfo.isDirectory().should.be.ok();
          done();
        });
      }, function (err) {
        done(err);
      });
    });
  });
  
  it('should warn if no language is provided and no default language is configured.', function (done) {
    fs.stat(languageDir, function (err, pathInfo) {
      chai.expect(err).to.be.ok();
      err.code.should.eql('ENOENT');
      
      cli
        .init({ username: 'specs_user', access_key: 'specs_access_key', }, { force: true })
        .then(function () {
          cli.train()
          .then(function () {
            done(new Error('Something is wrong. This interaction should have failed.'));
          }, function (err) {
            err.message.should.match(/language/);
            done();
          });
        });
    });
  });
});