module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {}
    },
    sprite:{
      all: {
        src: 'images/social/*.png',
        destImg: 'images/spritesheet.png',
        destCSS: '_sass/spritesheet.scss'
      }
    },
    copy: {
      cssAsScss: {
        files: [
          {
            expand: true,
            filter: 'isFile',
            cwd: './bower_components/hyde/public/css',
            src: '*.css',
            dest: './_sass',
            ext: '.scss'
          }
        ]
      }
    },
    tsd: {
      install: {
        options: {
          command: 'reinstall',
          config: 'tsd.json'
        }
      }
    },
    typescript: {
      src: {
        src: ['_scripts/*.ts'],
        dest: '_scripts/build',
        options: {
          module: 'amd',
          basePath: '_scripts/',
          noImplicitAny: true,
          watch: {
            after: ['requirejs']
          }
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: '_scripts/build',
          mainConfigFile: '_scripts/build/main.js',
          out: 'scripts/site.min.js',
          name: 'main',
          optimize: 'uglify'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-tsd');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', [
    'bower:install',
    'copy:cssAsScss',
    'sprite:all',
    'tsd:install',
    'typescript:src'
  ]);
};