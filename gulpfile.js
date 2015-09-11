var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var corsProxy = function() {
	var host = process.env.PORT ? '0.0.0.0' : '127.0.0.1';
	var port = process.env.PORT || 8080;

	var cors_proxy = require('cors-anywhere');
	cors_proxy.createServer({
    		originWhitelist: []
	}).listen(port, host, function() {
    		console.log('Running CORS Anywhere on ' + host + ':' + port);
	});
};

gulp.task('serve', function() {
	corsProxy();
	browserSync({
		server: {
			baseDir: 'app'
		}
	});
	
	gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: 'app'}, reload);
});
