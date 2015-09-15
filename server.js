var httpServer = require('./modified_modules/http-server.js');

var log = console.log;

var requestLogger = function (req, res, error) {
    var date = (new Date).toUTCString();
    if (error) {
		log('[%s] "%s %s" Error (%s): "%s"', date, req.method, req.url, error.status.toString(), error.message);
    } else {
		log('[%s] "%s %s" "%s"', date, req.method, req.url, req.headers['user-agent']);
    }
};

var server = httpServer.createServer({
	proxy: 'https://stat.unido.org:443/',
	root: './dist',
	cors: true,
	showDir: false,
	autoIndex: false,

	https: {
		cert: 'diman_todorov_cert.pem',
		key: 'diman_todorov_key.pem',
	},
	logFn: requestLogger
});
server.listen(8123);


