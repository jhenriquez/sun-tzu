var fs        = require('fs');
var path      = require('path');
var cli       = require('../lib/cli');
var IOHelpers = require('../lib/cli-io');
var rimraf    = require('rimraf');
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
  
  afterEach(function (done) {
      rimraf(languageDir, function (err) {
        if(err) { done(err); }
        done();
      });
  });
  
  describe('Handle Language Directory', function () {
    
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
  
  describe('Handle Challenge Persistence', function () {
    it("should ensure a directory for the kata exists, create it if doesn't", function (done) {
      cli
        .train({ language: 'javascript' })
        .then(function (challenge) {
          var challengeDirectoryPath = path.join(process.cwd(), challenge.language, challenge.name);
          
          fs.stat(challengeDirectoryPath, function (err, stat) {
            if (err) { return done(err); }
            chai.expect(stat).to.exist();
            stat.isDirectory().should.be.ok();
            done();
          });
          
        }, done);
    });
    
    it("should save the current session information", function (done) {
      cli
        .train({ language: 'javascript' })
        .then(function (challenge) {
          var sessionFilePath = path.join(process.cwd(), challenge.language, challenge.name, cli.SESSION_FILENAME);
          fs.readFile(sessionFilePath, function (err, content) {
            if (err) { return done(err); }
            var session = JSON.parse(content);
            chai.expect(session).to.be.a('object');
            chai.expect(session.solution).to.exist();
            chai.expect(session.project).to.exist();
            done();
          });
        }, done);
    });
    
    it("should create a file for the challenge's code", function (done) {
      cli
        .train({ language: 'javascript' })
        .then(function (challenge) {
          var codeFilename = challenge.name + IOHelpers.getLanguageExtension(challenge.language);
          var codeFilePath = path.join(process.cwd(), challenge.language, challenge.name, codeFilename);
          
          fs.readFile(codeFilePath, { encoding: 'utf8' },function (err, content) {
            if (err) { return done(err); }
            chai.expect(content).to.be.a('string');
            content.should.eql('function toInteger(n) {\n  \n}');
            done();
          });
        }, done);
    });
    
    it('should not persist the code or session when is undefined or has no valid data (is being peek)', function (done) {
      cli
        .train({ language: 'javascript' })
        .then(function (challenge) {
          var codeFilename = challenge.name + IOHelpers.getLanguageExtension(challenge.language);
          var codeFilePath = path.join(process.cwd(), challenge.language, challenge.name, codeFilename);
          
          fs.readFile(codeFilePath, { encoding: 'utf8' },function (err, content) {
            if (err) { return done(err); }
            chai.expect(content).to.be.a('string');
            content.should.eql('function toInteger(n) {\n  \n}');
            
            cli
              .train({ language: 'javascript', peek: true })
              .then(function (challenge) {
                var codeFilename = challenge.name + IOHelpers.getLanguageExtension(challenge.language);
                codeFilename = path.join(process.cwd(), challenge.language, challenge.name, codeFilename);
                
                fs.readFile(codeFilePath, { encoding: 'utf8' }, function (err, code) {
                  if (err) { return done(err); }
                  chai.expect(code).to.be.a('string');
                  content.should.eql('function toInteger(n) {\n  \n}');
                  
                  var sessionFilePath = path.join(process.cwd(), challenge.language, challenge.name, cli.SESSION_FILENAME);
                  
                  fs.readFile(sessionFilePath, { encoding: 'utf8' }, function (err, session) {
                    if (err) { return done(err); }
                    session = JSON.parse(session);
                    chai.expect(session).to.be.a('object');
                    chai.expect(session.project).to.be.ok();
                    chai.expect(session.solution).to.be.ok();
                    done();
                  });
                  
                });
                
              }, function (err) {
                done(new Error('Something is wrong. This should not have failed. Error Message: ' + err.message));
              });
          });
          
        }, function (err) {
          done(new Error('Something is wrong. This should not have failed. Error Message: ' + err.message));
        });
    });
    
    it('should not overwrite a pre-existent code file.');
  });
});