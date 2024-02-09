module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //configurar o plug-in (less)
        less:{
            //ambiente de desenvolvimento
            development:{
                files:{
                    'dev/styles/main.css':'src/styles/main.less'
                }
            },
            //ambiente de produção
            production:{
                options:{
                    compress:true,
                },
                files:{
                    'dist/styles/main.min.css':'src/styles/main.less'
                }
            
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },

        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten:true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten:true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html':'src/index.html'
                }
            }
        },
        clean: ['prebuild']

        //configuração do plug-in sass
        // sass:{
        //     dist:{
        //         options:{
        //             style: 'compressed'
        //         },
        //         files: {
        //             'main2.css':'main.scss'
        //         }
        //     }
        // },
        // concurrent: {
        //     target: ['less', 'sass']
        // }
    })

    // grunt.registerTask('olaGrunt', function() {
    //     const done = this.async();
    // })

    //carregar o plu-in
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    // grunt.loadNpmTasks('grunt-contrib-sass');
    // grunt.loadNpmTasks('grunt-concurrent');

    // registrar as tarefas
    //depois que coloquei as tarefas no concurrent eu troquei o array para concurrent
    grunt.registerTask('default', ['watch'])
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean'])
    
}