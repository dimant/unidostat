var httpServer = require('http-server');

var proxyServer = httpServer.createServer({
	proxy: 'https://stat.unido.org:443/',
	cors: true
});
proxyServer.listen(8123);

var server = httpServer.createServer({
	root: './dist',
});
server.listen(8443);
