var httpServer = require('./modified_modules/http-server.js');

var proxyServer = httpServer.createServer({
	proxy: 'https://stat.unido.org:443/',
	cors: true,
	https: {
		cert:'diman_todorov_cert.pem',
		key:'diman_todorov_key.pem',
	}
});
proxyServer.listen(8123);

var server = httpServer.createServer({
	root: './app',
	https: {
		cert:'diman_todorov_cert.pem',
		key:'diman_todorov_key.pem',
	}
});
server.listen(8000);
