
module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.initConfig
    browserify:
      build:
        src: ['src/scripts/index.coffee']
        dest: 'build/index.js'
        options:
          keepAlive: true
          watch: true
          browserifyOptions:
            debug: true
            extensions: ['.coffee']
            transform: ['coffeeify']
    uglify:
      production:
        options:
          mangle: true
          compress:
            dead_code: true
            properties: true
            sequences: true
          report: 'min'
          preserveComments: false
          screwIE8: true
        files:
          'build/index.js': 'build/index.min.js'
    sass:
      build:
        files:
          'build/index.css': 'src/styles/index.sass'
        options:
          sourcemap: 'auto'
    watch:
      sass:
        files: ['src/styles/**/*.sass']
        tasks: ['sass:build']
        options:
          spawn: false

  grunt.registerTask(
    'watch-scripts'
    [ 'browserify:build' ]
  )
  grunt.registerTask(
    'watch-styles'
    [ 'sass:build', 'watch' ]
  )
  grunt.registerTask(
    'default'
    [ 'browserify:build', 'uglify:production' ]
  )
