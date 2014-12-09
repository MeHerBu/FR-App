module.exports = function(grunt) {
    /* --------------------------------
    環境設定
    -------------------------------- */
    // 変数定義
    var pkg, taskName;
    pkg = grunt.file.readJSON('package.json');

    // pakage.jsonに記載されているパッケージを自動読み込み
    for(taskName in pkg.devDependencies) {
        if(taskName.substring(0, 6) == 'grunt-') {
            grunt.loadNpmTasks(taskName);
        }
    }


    /* --------------------------------
    タスクの設定
    -------------------------------- */
    grunt.initConfig({

        // 変数定義
        pkg: pkg,
        dir: {
            bin: 'src', // 作業フォルダ
            js: '**',
            css: '**',
            img: '**'
        },

        // Compassの設定
        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },

        // ファイルを監視する
        watch: {
            sass: {
                files: ['<%= dir.bin %>/sass/*.scss'],
                tasks: ['compass']
            }
        },

        // CSSのプロパティを揃える
        csscomb: {
            dev: {
                expand: true,
                cwd: '<%= dir.bin %>/css/',
                src: ['*.css'],
                dest: '<%= dir.bin %>/css/'
            }
        },

        // CSS圧縮（srcに複数ファイルを指定することで、1つのファイルに圧縮される）
        cssmin: {
            min: {
                src: ['<%= dir.bin %>/css/*.css'],
                dest: '<%= dir.bin %>/css/<%= pkg.name %>.min.css'
            }
        },

        // JS圧縮（srcに複数ファイルを指定することで、1つのファイルに圧縮される）
        uglify: {
            min: {
                src: ['<%= dir.bin %>/js/*.js'],
                dest: '<%= dir.bin %>/js/<%= pkg.name %>.min.js'
            }
        },

        //PNG画像減色
        pngmin: {
            min: {
                options: {
                    ext: '.png',
                    quality: '80-90',
                    force: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= dir.bin %>/img/',
                    src: ['**/*.png'],
                    dest: '<%= dir.bin %>/img/'
                }]
            }
        },

        // 不要なファイルを削除する
        clean: {
            // 不要なファイルを削除する
            cleanup: {
                // releaseフォルダ内から不要ファイル削除
                del: {
                    src: ['<%= dir.bin %>/**/.DS_Store', '<%= dir.bin %>/**/Thumbs.db']
                }
            }
        }
    });



    /* --------------------------------
    タスクの実行
    -------------------------------- */
    // デフォルトタスク（gruntで実行可能）
    grunt.registerTask('default', ['watch']);

    // 圧縮
    grunt.registerTask('min', ['csscomb', 'cssmin', 'uglify', 'pngmin', 'clean']);

    // 処理でエラーが出てもgruntを続ける
    grunt.registerTask('eatwarnings', function() {
        grunt.warn = grunt.fail.warn = function(warning) {
            grunt.log.error(warning);
        };
    });
};


