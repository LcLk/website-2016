module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-coffeeify');

  // configure the tasks
  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'build/index.js': [
            'src/scripts/**/*.coffee']
        },
        options: {
          transform: ['coffeeify'],
          keepAlive: true,
          browserifyOptions: {
            watchify: true
          }
        }
      }
    },
    // compile sass into css
    sass: {
      build: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'src/stylesheets',
          src: [ 'main.sass' ],
          dest: 'build/stylesheets',
          ext: '.css'
        }]
      }
    },
    // Minify css
    cssmin: {
      build: {
        files: {
          'build/application.css': [ 'build/stylesheets/**/*.css', 'build/stylesheets/*.css' ]
        }
      }
    },
    // Compile coffee into js
    coffee: {
      build: {
        expand: true,
        cwd: 'src',
        src: [ 'javascript/**/*.coffee', 'javascript/*.coffee' ],
        dest: 'build',
        ext: '.js'
      }
    },
    // build js
    browserify: {
      build: {
        src: [ 'build/javascript/index.js', 'build/javascript/**/*.js', 'build/javascript/*.js' ],
        dest: 'build/application.js'
      }
    },
    // Minify JS
    uglify: {
      build: {
        options: {
          mangle: false,
          preserveComments: 'all'
        },
        files: {
          'build/application.min.js': 'build/application.js'
        }
      }
    },
    watch: {
      stylesheets: {
        files: 'src/**/*.sass',
        tasks: [ 'stylesheets' ]
      },
      scripts: {
        files: 'src/**/*.coffee',
        tasks: [ 'javascript' ]
      },
      copy: {
        files: [ 'src/**', '!src/stylesheets', '!src/javascript'],
        tasks: [ 'copy' ]
      }
    },
  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // building styles
  grunt.registerTask(
    'stylesheets',
    'Compiles sass and minifies it.',
    [ 'sass', 'cssmin', 'clean:stylesheets' ]
  );

  // building scripts
  grunt.registerTask(
    'javascript',
    'Compiles coffee and minifies it.',
    [ 'browserify' ]
  );


  // define a task which will build the whole app
  grunt.registerTask(
    'build',
    'Compiles all of the assets and copies the files to the build directory.',
    [ 'clean', 'copy', 'stylesheets', 'javascript' ]
  );

  // define the tasks
};
