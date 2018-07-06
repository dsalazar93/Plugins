module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: '\n;'
			},
			vendors: {
				src: [
					  'node_modules/jquery/dist/jquery.min.js',
					  'node_modules/jquery-ui-dist/jquery-ui.min.js',
					  'node_modules/bootstrap/dist/js/bootstrap.min.js',
					  'node_modules/jScrollPane/script/jquery.mousewheel.js',
					  'node_modules/jScrollPane/script/jquery.jscrollpane.min.js',
					  'node_modules/timecircles/inc/TimeCircles.js',
					 ],
				dest: 'common/js/vendors.min.js'
			}
		},
		uglify: {
			options: {

			},
			dist: {
				files: {
					'<%= concat.vendors.dest%>':['<%= concat.vendors.dest%>']
				}
			}
		},
		cssmin: {
			target: {
				files: {
					'common/css/vendors.css': 	[
						"common/css/fonts.css",
						"node_modules/bootstrap/dist/css/bootstrap.css",
						"node_modules/animate.css/animate.min.css",
						'node_modules/timecircles/inc/TimeCircles.css',
					]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
}