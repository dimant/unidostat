var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var minifyCss = require('gulp-minify-css');
var rimraf = require('gulp-rimraf');
var removeHtmlComments = require('gulp-remove-html-comments');
var httpServer = require('http-server');

var corsProxy = function() {
	var host = '0.0.0.0';
	var port = 8080;

	var cors_proxy = require('cors-anywhere');
	cors_proxy.createServer({
    		originWhitelist: []
	}).listen(port, host, function() {
    		console.log('Running CORS Anywhere on ' + host + ':' + port);
	});
};

gulp.task('serve', function() {
	corsProxy();
	var server = httpServer.createServer({
		root: 'dist/',
	});
	server.listen(8000);	
});

gulp.task('serve-dev', function() {
	corsProxy();
	browserSync({
		server: {
			baseDir: 'app'
		}
	});
	
	//gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: 'app'}, reload);
});

gulp.task('compile', function() {
	var assets = useref.assets();

	return gulp.src('app/*.html')
		.pipe(assets)
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(removeHtmlComments())
		.pipe(gulp.dest('dist'));
});

gulp.task('copy-visuals', function() {
	return gulp.src('app/visuals/*')
		.pipe(gulp.dest('dist/visuals/'));
});

gulp.task('copy-bower', function() {
	return gulp.src(['app/bower_components/**/*'])
		.pipe(gulp.dest('dist/bower_components'));
});

gulp.task('clean', function() {
  return gulp.src('dist/**/*', { read: false })
		.pipe(rimraf());
});

gulp.task('build', ['copy-visuals', 'compile', 'copy-bower']);
