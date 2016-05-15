/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//	Gulp Task Registry
////	Load up common taks and dependencies
////	for the applications workspace 
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//	Required Vars
/////////////////////////////////////////////////////////////////////////////
var _const = require('./private/constants.js'),
	gulp = require('gulp'),
	runSequence = require('run-sequence'),
	paths = require('./gulp/paths.js'),
	protractor = require('gulp-protractor').protractor,
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	compass = require('gulp-compass'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	browserify = require('browserify')
	gulpify = require('gulp-browserify'),
	shim = require('browserify-shim'),
	custom_shims = require('./gulp/browserify.shim.js');


/////////////////////////////////////////////////////////////////////////////
//	Task: Watch - Check for changes in files and run additional tasks
/////////////////////////////////////////////////////////////////////////////
gulp.task('watch', function(){
	gulp.watch(paths.js + '/**/*.js', ['scripts']),
	gulp.watch(paths.scss + '/**/*.scss', ['compass']),
	gulp.watch(paths.html + '/**/*.html', ['html']);
	gulp.watch(paths.src + '/index.html', ['html']);
});
/////////////////////////////////////////////////////////////////////////////
// Task: Clean - Delete dist and build to allow for nice, clean files!
/////////////////////////////////////////////////////////////////////////////
gulp.task('clean', function(callback) {
	return del(['build', 'dist'], callback);
});
/////////////////////////////////////////////////////////////////////////////
//	Task: Scripts
/////////////////////////////////////////////////////////////////////////////
gulp.task('scripts', function(){
	gulp.src([
		paths.js + '**/*.js', 
		'!' + paths.js + '**/*.min.js', 
		'!' + paths.tests 
	])
	.pipe(gulpify({
        insertGlobals: true,
        debug: !gulp.env.production,
        transform: ['debowerify'],
    }))
    .pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(concat('bundle.min.js'))
	.pipe(gulp.dest(paths.build))
	.pipe(reload({stream:true}))
});
/////////////////////////////////////////////////////////////////////////////
//	Task: Styles Compiler
/////////////////////////////////////////////////////////////////////////////
gulp.task('compass', function(){
	gulp.src( paths.scss + '/style.scss')
	.pipe(plumber())
	.pipe(compass({
		config_file: './config.rb',
		css: paths.css,
		sass: paths.scss,
		require: ['susy']
	}))
	.pipe(gulp.dest(paths.build + '/css'))
	.pipe(reload({stream:true}))
})
/////////////////////////////////////////////////////////////////////////////
//	Task: Default 
/////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['clean'], function(){
	runSequence('scripts', 'compass', 'html', ['sync', 'watch']);
	console.log("Watching Files...");
})
/////////////////////////////////////////////////////////////////////////////
//	Task: HTML
/////////////////////////////////////////////////////////////////////////////
// gulp.task('html', ['html:vulcanize', 'html:ugly'], function(){
// 	gulp.src([paths.html + '/**/*.html', "./src/index.html"])
// 	.pipe(gulp.dest(paths.build))
// 	.pipe(reload({stream:true}))
// });
gulp.task('html', function(){
	gulp.src([paths.html + '/**/*.html', "./src/index.html"])
	.pipe(gulp.dest(paths.build))
	.pipe(reload({stream:true}))
});
/////////////////////////////////////////////////////////////////////////////
//	Task: HTML: Vulcanize - Concat all html files into one
/////////////////////////////////////////////////////////////////////////////
gulp.task('html:vulcanize', function() {
    return gulp.src(paths.html)
        .pipe(vulcanize({
            abspath: '',
            excludes: [],
            stripExcludes: false
        }))
        .pipe(gulp.dest(paths.build));
});
/////////////////////////////////////////////////////////////////////////////
//	Task: HTML: Uglify - Destroy human readability
/////////////////////////////////////////////////////////////////////////////
gulp.task('html:ugly', function() {
    // Minify and copy all JavaScript (except vendor scripts) 
    // with sourcemaps all the way down 
    return gulp.src(paths.html)
        // .pipe(sourcemaps.init())
        // .pipe(uglify())
        .pipe(concat('bundle.html'))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build));
});
/////////////////////////////////////////////////////////////////////////////
//	Task: Images
/////////////////////////////////////////////////////////////////////////////
gulp.task('images', function() {
    return gulp.src(paths.images)
        // Pass in options to the task 
        .pipe(imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('build/assets'));
});

/////////////////////////////////////////////////////////////////////////////
//	Task: Protractor Tests - Runs the protractor config
/////////////////////////////////////////////////////////////////////////////
gulp.task('test', function(){
	return gulp.src(["./src/tests/**/*-spec.js", '!' + './src/tests/conf.js'])
    .pipe(protractor({
        configFile: paths.tests + "/conf.js",
        args: ['--baseUrl', 'http://127.0.0.1:8000']
    }))
    .on('error', function(e) { throw e });
})

/////////////////////////////////////////////////////////////////////////////
//	Task: Browser Sync - Detects html js css save changes and reloads browsers
/////////////////////////////////////////////////////////////////////////////
gulp.task('sync', function(){
	browserSync({
		server: {
			baseDir: paths.build
		},
		port: _const.port,
		notify: false, // Disable the on-page notice BrowserSync is running.
		logConnections: true // Log all devices that are connected.
	})
});