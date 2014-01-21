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

    # coffee:
    #   compile:
    #     files:
    #       'js/collaborating415.coffee.js': [
    #         'js/*.coffee'
    #       ]

    concat:
      dev:
        files:
          'js/gridifier.min.js': [
            'js/main.js'
          ]

    uglify:
      prod:
        options:
          mangle: true
          compress: true
          preserveComments: 'some'
        files:
          'js/gridifier.min.js': [
            'js/main.js'
          ]

    watch:
      options:
        livereload: true
      stylus:
        options:
          livereload: false
        files: ['css/*.styl']
        tasks: ['stylus']
      concat:
        options:
          livereload: false
        files: ['js/*.js']
        tasks: ['concat:dev']
      css:
        files: ['css/*.css']
      js:
        files: ['js/*.js']
      html:
        files: ['*.html']

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.registerTask 'build', [
    'svgmin'
    # 'imageoptim'
    'stylus'
    # 'coffee'
    'concat'
    'uglify:prod'
  ]

  grunt.registerTask 'default', [
    'watch'
  ]
