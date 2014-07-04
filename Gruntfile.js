module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
        combine: {
            files: {
              'stylesheets/master.min.css': ['_assets/stylesheets/poole.css', 
                                             '_assets/stylesheets/syntax.css', 
                                             '_assets/stylesheets/hyde.css', 
                                             '_assets/stylesheets/spritesheet.css',
                                             '_assets/stylesheets/site.css']
            }
        }
    },
    sprite:{
      all: {
        src: '_assets/images/*.png',
        destImg: 'images/spritesheet.png',
        destCSS: '_assets/stylesheets/spritesheet.css'
      }
    },
    watch: {
      scripts: {
        files: ['_assets/stylesheets/*.css'],
        tasks: ['cssmin'],
        options: {
          spawn: false,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-cssmin');  
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sprite', 'cssmin']);
};