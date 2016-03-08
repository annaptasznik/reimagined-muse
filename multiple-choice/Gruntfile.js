module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        copy: {
            before: {
                src: 'www/config.xml',
                dest: 'giac/config.xml'
            },
            after: {
                files: [

                    {expand: true, cwd: 'giac/', src: ['css/**', 'fonts/**', 'img/**', 'config.xml'], dest: 'www/'},
                    {expand: true, cwd: 'giac/', src:['templates/*.html'], dest: 'www/'}
                ]
            }
        },
        clean: {
            www: {
                src: [
                    'www'
                ]
            },
            temp: {
                src: [
                    'www/.temp'
                ]
            }
        },
        concat: {
            lib: {
                src: [
                    'giac/js/lib/ionic.js',
                    'giac/js/lib/angular/angular.js',
                    'giac/js/lib/angular/angular-*.js',
                    'giac/js/lib/angular-ui/angular-ui-router.js',
                    'giac/js/lib/ionic-angular.js'

                ],
                dest: 'giac/.temp/ia.concat.js'
            },
            js: {
                src: [
                    'giac/js/app.js',
                    'giac/js/*.js'
                ],
                dest: 'giac/.temp/app.concat.js'
            }
        },
        ngmin: {
            lib: {
                src: 'giac/.temp/ia.concat.js',
                dest: 'giac/.temp/ia.ngmin.js'
            },
            js: {
                src: 'giac/.temp/app.concat.js',
                dest: 'giac/.temp/app.ngmin.js'
            }
        },
        uglify: {
            lib: {
                src: 'giac/.temp/ia.ngmin.js',
                dest: 'www/js/ia.min.js'
            },
            js: {
                src: 'giac/.temp/app.ngmin.js',
                dest: 'www/js/app.min.js'
            }
        },
        sass: {
            dist: {
                files: [
                    {
                        src: ['giac/scss/app.scss'],
                        dest: 'giac/css/app.css'
                    }
                ]
            }
        },
        replace: {
            html: {

                src: [ 'giac/index.html' ],
               // dest: 'www/templates/',
                dest: 'www/index.html',

                replacements: [
                    {
                        // non-greedy ( lazy ) match of all White Space and Non-White Space characters
                        from: /<!-- GIACSTART -->[\s\S]*?<!-- GIACEND -->/g,
                        to: '<link rel="stylesheet" href="css/app.css">\n\t' +
                                '<link rel="stylesheet" href="css/multiple-choice.css">\n\t' +
                                '<link rel="stylesheet" href="css/font-awesome.css">\n\t' +
                                '<script src="js/ia.min.js"></script>\n\t' +                                
                                '<script type="text/javascript" src="cordova.js"></script>\n\t' +
                                '<script src="js/app.min.js"></script>'
                    }
                ]
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });



    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask("default", ["copy:before", "clean", "concat", "ngmin", "uglify", "sass", "copy:after", "replace" ]);

};