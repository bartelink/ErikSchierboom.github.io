module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {}
    },
    typescript: {
      src: {
        src: ['_scripts/*.ts'],
        dest: '_temp/scripts',
        options: {
          module: 'amd',
          basePath: '_scripts/',
          noImplicitAny: true,
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: '_temp/scripts/',
          mainConfigFile: '_temp/scripts/main.js',       
          out: 'scripts/site.min.js',
          name: 'main',
          optimize: 'none' 
        }
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
    less: {
      src: {
        options: {
          compress: true,
          cleancss: true,
        },
        files: {
          'stylesheets/site.min.css': '_stylesheets/site.less'
        }
      }
    },
    sprite:{
      all: {
        src: '_images/social/*.png',
        destImg: 'images/spritesheet.png',
        destCSS: '_stylesheets/spritesheet.less'
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '_images',
          src: ['*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      },
      albums: {
        files: [{
          expand: true,
          cwd: 'images/albums',
          src: ['*.{png,jpg,gif}'],
          dest: 'images/albums'
        }]
      },
      movies: {
        files: [{
          expand: true,
          cwd: 'images/movies',
          src: ['*.{png,jpg,gif}'],
          dest: 'images/movies'
        }]
      }
    },
    watch: {
      typescript: {
        files: ['_scripts/*.ts'],
        tasks: ['typescript', 'requirejs'],
        options: {
          spawn: false,
        },
      },
      stylesheets: {
        files: ['_stylesheets/*.*'],
        tasks: ['less'],
        options: {
          spawn: false,
        },
      },
    },
  });
    
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-tsd');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');  
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('default', [
    'bower:install',
    'tsd:install',
    'typescript:src',
    'requirejs:compile',
    'sprite:all',
    'newer:imagemin',
    'less:src',    
  ]);
};