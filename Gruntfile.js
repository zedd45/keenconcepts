/**
 * simple gruntfile to minify assets and use node-sass.  
 * TODO: move constants out to JSON file
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

		copy: {
  			
  			images: {
    			files: [{
    				expand: true, 
    				src: ['css/images/*'], 
    				dest: 'static',
    				filter: 'isFile'
    			}]
    		},

    		faLib: {
    			files: [{
    				expand: true, 
    				src: ['css/font-awesome.min.css'], 
    				dest: 'static',
    				filter: 'isFile'
    			}]
    		},

    		fonts: {
    			files: [{
    				expand: true,
    				src: ['fonts/*.*'],
    				dest: 'static',
    				filter: 'isFile'
    			}]
    		}

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
		 * concat & obsfucate js
		 * NOTE: "files" here is NOT analogous to Grunt's "files." You will need to read the contrib-uglify doc for more info
		 * TODO: make files more dynamic (maybe a pull request for it to use Grunt's expand (http://gruntjs.com/api/grunt.file#grunt.file.expandmapping)
		 */
		uglify: {

            options: {
				banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("mm-dd-yyyy") %> */\n',
				preserveComments: 'some',
				report: 'min',
				// mangle: false,
				// compress: false,
				sourceMap: true
			},

			dist : {
				files: {
					'static/js/site.js' : [
						'js/skel.min.js',
						'js/classie.js',
						'js/init.js',
						'js/kc.js'
					]
				}
			}
		},


		watch: {
			
			sass: {
				files: ['**/*.scss'],
				tasks: ['sass:dev']
			},

			js: {
				files: ['js/**/*.js'],
				tasks: ['jshint']
			}

		}
		
	});



	grunt.registerTask('default', ['dist']);

	grunt.registerTask('dev', ['sass:dev', 'watch']);
	grunt.registerTask('dist', ['copy', 'sass:dist', 'uglify:dist'])

	
};
