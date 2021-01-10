module.exports = function(grunt) {
    // Load Tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Copy Task
        // default: Copies over HTML, static assets to dist
        copy: {
            default: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: 'src/*.html',
                    dest: 'dist/'
                }]
            }
        },

        // sass Task
        // default: Convert SCSS to CSS
        // dist:  Convert SCSS to CSS and compress the output
        sass: {
            options: {
                includePaths: [ 'node_modules/normalize-scss/sass/' ]
            },
            src: {
                files: {
                    'dist/styles/main.css': 'src/styles/main.scss'
                },
            },
            dist: {
                files: {
                    'dist/styles/main.css': 'src/styles/main.scss'
                },
                outputStyle: 'compressed'
            }
        },

        // uglify Task
        // default: Optimize concatenated JS.
        uglify: {
            dist: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js',
                }
            }
        },

        // ImageMin Task
        // default: Optimize all image assets
        imagemin: {
            default: {
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,gif,ico}'],
                    dest: 'dist/images/'
                }]
            }
        },


        // SVGMin Task
        // default: Optimize all SVG assets
        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: false
                    }, {
                        removeUselessStrokeAndFill: false
                    }
                ]
            },
            default: {
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.svg'],
                    dest: 'dist/images/'
                }]
            }
        },

        // Watch Task
        // Watches source files for changes and runs tasks based on the changed files
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: ['src/styles/**/*.scss'],
                tasks: ['sass']
            },
            javascript: {
                files: [
                    'src/scripts/**/*.js'
                ],
                tasks: ['uglify']
            },
            images: {
                files: ['src/images/**/*.{png,jpg,gif,ico}'],
                tasks: ['imagemin', 'svgmin']
            }
        }
    });

    // Register Task: build
    // Compiles the code for the designated distribution target
    grunt.registerTask('build', function() {
        grunt.task.run([
            'newer:copy',
            'newer:sass:src',
            'newer:uglify',
            'newer:imagemin',
            'newer:svgmin'
        ]);
    });


    // Register Task: watch
    // Compiles the code for the designated target and then watches for changes
    grunt.registerTask('watch', function() {
        grunt.task.run([
            'build',
            'watch'
        ]);
    });

    // Register Task: dist
    // Compiles the code for the designated distribution target
    grunt.registerTask('dist', function() {
        grunt.task.run([
            'copy',
            'sass:dist',
            'uglify',
            'imagemin',
            'svgmin'
        ]);
    });

    // Register Default task(s)
    grunt.registerTask('default', ['dist']);
};
