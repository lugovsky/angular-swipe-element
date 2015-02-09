module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        uglify: {
            main: {
                files: {
                    'angular-swipe-element.min.js': ['angular-swipe-element.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', 'uglify:main');

};