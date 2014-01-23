module.exports = (grunt) ->

  grunt.initConfig

    svgmin:
      options:
        plugins: [{
          removeViewBox: false
        }]
      files:
        expand: true
        cwd: 'img'
        src: ['*.svg']
        dest: 'img'
        ext: '.svg'

    imageoptim:
      options:
        imageAlpha: true
        jpegMini: true
        quitAfter: true
      compress:
        src: [
          'img'
        ]

    stylus:
      compile:
        options:
          paths: ['css']
          use: ['nib']
          import: ['nib']
          compress: true
          urlfunc: 'embedurl'
        files:
          'css/gridifier.min.css': [
            'css/normalize.styl'
            'css/main.styl'
          ]

    concat:
      options:
        process: (src, filepath) ->
          return '// ' + filepath + '\n' + src
      dev:
        files:
          'js/gridifier.min.js': [
            'js/jquery-2.0.3.min.js'
            'js/templates.js'
            'js/main.js'
            'js/help.js'
          ]
      prod:
        files:
          'js/gridifier.min.js': [
            'js/jquery-2.0.3.min.js'
            'js/templates.min.js'
            'js/main.min.js'
            'js/help.min.js'
          ]

    uglify:
      all:
        options:
          mangle: true
          compress: true
          preserveComments: 'some'
        files: [
          expand: true
          cwd: 'js/'
          src: ['*.js', '!*.min.js']
          dest: 'js/'
          ext: '.min.js'
        ]

    watch:
      options:
        livereload: true
      stylus:
        options:
          livereload: false
        files: ['css/*.styl', '!css/*.min.css']
        tasks: ['stylus']
      concat:
        options:
          livereload: false
        files: ['js/*.js', '!js/*.min.js']
        tasks: ['concat:dev']
      css:
        files: ['css/gridifier.min.css']
      js:
        files: ['js/gridifier.min.js']
      html:
        files: ['*.html']

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.registerTask 'build', [
    'svgmin'
    'stylus'
    'uglify'
    'concat:prod'
  ]

  grunt.registerTask 'default', [
    'watch'
  ]
