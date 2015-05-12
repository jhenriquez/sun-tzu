module.exports = function (g) {
  var watchedFiles = ['Gruntfile.js', 'specs/**/*.js','lib/**/*.js'];
  g.initConfig({
    
    jshint: {
      files: watchedFiles,
      options: { }
    },

    watch: {
      scripts: {
        files: watchedFiles,
        tasks: ['jshint'],
        options: {
          spawn: false,
        },
      },
    }
    
  });

  g.loadNpmTasks('grunt-contrib-jshint');
  g.loadNpmTasks('grunt-contrib-watch');

  g.registerTask('default', ['jshint']);
};