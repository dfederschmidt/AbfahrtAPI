module.exports = function(grunt) {
 
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'app.js','routes/*']
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', 'jshint');
 
};
