module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    typescript: {
      src: {
        src: ['_assets/scripts/*.ts'],
        dest: '_temp/scripts',
        options: {
          module: 'amd',
          basePath: '_assets/scripts/',
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
          'stylesheets/site.min.css': '_assets/stylesheets/site.less'
        }
      }
    },
    sprite:{
      all: {
        src: '_assets/images/social/*.png',
        destImg: '_assets/images/spritesheet.png',
        destCSS: '_assets/stylesheets/spritesheet.css'
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '_assets/images',
          src: ['*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      },
      covers: {
        files: [{
          expand: true,
          cwd: 'images/albums',
          src: ['*.{png,jpg,gif}'],
          dest: 'images/albums'
        }]
      }
    },
    watch: {
      typescript: {
        files: ['_assets/scripts/*.ts'],
        tasks: ['typescript', 'requirejs'],
        options: {
          spawn: false,
        },
      },
      stylesheets: {
        files: ['_assets/stylesheets/*.*'],
        tasks: ['less'],
        options: {
          spawn: false,
        },
      },
    },
  });
    
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-tsd');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-less');  
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('default', [
    'tsd:install',
    'typescript:src',
    'requirejs:compile',
    'sprite:all',
    'less:src',
    'newer:imagemin'
  ]);
};