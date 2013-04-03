/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    compass: {
      dist: {
        options: {
          require: 'zurb-foundation',
          sassDir: '_assets/sass',
          cssDir: 'css',
          outputStyle: 'expanded',
          noLineComments: true,
          app: 'standalone',
          environment: 'production',
          raw: 'preferred_syntax = :scss\n'
        }
      }
    },
    cssmin: {
      compress: {
        files: {
          'css/app.min.css': ['css/site.css']
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    'jshint': {
      all: ['js/*.js', '!js/modernizr.js', '!js/foundation.js', '!js/jquery.js', '!js/zepto.js', '!js/vendor/**/*.js'],
      options: {
        browser: true,
        curly: false,
        eqeqeq: false,
        eqnull: true,
        expr: true,
        immed: true,
        newcap: true,
        noarg: true,
        smarttabs: true,
        sub: true,
        undef: false
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/app.min.js'
      }
    },
    regarde: {
      js: {
        files: '_assets/js/**/*.js',
        tasks: ['jshint', 'livereload'],
        //spawn: true
      },
      css: {
        files: '_assets/sass/**/*.scss',
        tasks: ['compass:dist', 'livereload'],
        events: true
      },
      php: {
        files : '**/*.php',
        tasks : 'livereload'
      }
    },

    gruntfile: {
      src: 'Gruntfile.js'
    }
  });

  grunt.registerTask('default', ['livereload-start', 'regarde']);
  grunt.registerTask('dist', ['compass', 'cssmin', 'jshint', 'uglify', 'concat']);

  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-livereload');

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
};
