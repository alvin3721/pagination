/**
 * Created by wWX318801 on 2017/1/23.
 */
/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            "install": {
                "options": {
                    "targetDir": "vendors/3rd",
                    "layout": "byComponent",
                    "install": true,
                    "verbose": false,
                    "cleanTargetDir": true
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('copy3rd', ['bower']);
};
