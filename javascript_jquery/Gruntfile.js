module.exports = function(grunt) {

  // Register a watch-reload task to compile theme and run livereload.
  grunt.config.merge({
    watch: {
      css: {
        files: ['**/*.scss'],
        tasks: ['compile-theme'],
        options: {
          livereload: true,
        }
      }
    }
  });
  grunt.registerTask('watch-reload', 'watch:css');

  /**
   *  Function to set compass config options for production and to add clean task.
   *  we want to make sure to clean out any .map files on production.
   */
  function compassProd() {
    var config = grunt.config.get('config');
    taskList = [];

    for (var key in config.themes) {

      var prodCmd = grunt.config.get(['config', 'themes', key,  'scripts', 'compile-theme-prod']);

      // Set compile options for prod.
      grunt.config.set(['config', 'themes', key,  'scripts', 'compile-theme'], prodCmd);

      // Get base path for theme so we can set it in the new clean task.
      var compassBasePath = grunt.config.get(['config', 'themes', key,  'path']);
      compassBasePath = compassBasePath + '/css/**/*.map';

      // Add a target to the clean task to delete .map files.
      grunt.config.set(['clean', key], compassBasePath);

      // Create a task list to pass to compile-theme which gets run by grunt:default.
      var cleanTask = 'clean:' + key;
      var task = 'themes:' + key + ":" + "compile-theme";

      taskList.push(cleanTask);
      taskList.push(task);

      // Re-register the compile-theme task with new tasklist that includes clean.
      grunt.registerTask('compile-theme', taskList);
    }
  }
  var target = grunt.option('target');
  if (target == 'prod') {
    // Use the makefile set in srcPaths:prod in gruntconfig.
    var prodMakefilePath = grunt.config.get('config.srcPaths.prod');
    grunt.config.set('config.srcPaths.make', prodMakefilePath);
    compassProd();
  }
};