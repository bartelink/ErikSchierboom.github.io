module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      production: {
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
      }
    },
    watch: {
      stylesheets: {
        files: ['_assets/stylesheets/*.*'],
        tasks: ['less'],
        options: {
          spawn: false,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('default', ['sprite', 'newer:imagemin', 'newer:less']);
};