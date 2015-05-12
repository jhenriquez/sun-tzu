module.exports = function (g) {
  g.initConfig({
    
    jshint: {
      files: ['Gruntfile.js', 'specs/**/*.js'],
      options: { }
    },

    watch: {
      scripts: {
        files: ['**/*.js'],
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