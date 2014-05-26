/**
 * simple gruntfile to minify assets and use node-sass.  
 */

module.exports = function(grunt) {
	
	'use strict';

	// use matchdep to load our grunt contrib modules dynamically from package.json's dev dependencies (filterDev)
	require('matchdep').filterDev('grunt-*', require("./package.json")).forEach( grunt.loadNpmTasks );
	
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		sassFiles: [{
			expand: true,
			cwd: 'sass',
			src: ['**/*.scss'],
			dest: 'static/css',
			ext: '.css'
		}],


		/**
		 * blow away generated files
		 * https://github.com/gruntjs/grunt-contrib-clean
		 */
		clean: {
			generated : [
				"static"
			]
		},
		
		/**
		 * check that our files will compile in uglify
		 */
		jshint: {
			files: ['GruntFile.js', 'package.json', 'js/**/*.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					console: true,
					document: true
				}
			}
		},

		 sass: {

		 	dev: {
		 		
		 		files: '<%= sassFiles %>',

		 		options: {
	                outputStyle: 'nested'
	            }
		 	},
		 	
			dist: {
				files: '<%= sassFiles %>',

		 		options: {
	                outputStyle: 'compressed'
	            }
			}
		},
		
		
		
		/**
		 * concat & obsfucated js
		 * NOTE: if you need more than one output file, Uglify doesn't seem to follow the standard Grunt File Patterns convention,
		 *       so you will need to specify a whole new target. 
		 */
		uglify: {

            options: {
				banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("mm-dd-yyyy") %> */\n',
				preserveComments: 'some',
				report: 'min',
				sourceMap: true
			},

			dist : {
				files: {
					'static/js/site.js' : ['js/**.*.js']
				}
			}
		}
		
	});

	grunt.registerTask('default', ['dist']);

	grunt.registerTask('dev', ['sass:dev']);
	grunt.registerTask('dist', ['sass:dist', 'uglify:dist'])

	
};
