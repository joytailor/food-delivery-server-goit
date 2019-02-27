const http = require('http');
const url = require('url');

const morgan = require('morgan');
const router = require('./routes/router');
const getRouteHandler = require('./helpers/get-route-handler');

const logger = morgan('combined');

const startServer = port => {

  const server = http.createServer((request, response) => {

    const parsedUrl = url.parse(request.url);

    const func = getRouteHandler(router, parsedUrl.path) || router.default;

    logger(request, response, () => func(request, response));
  });

  server.listen(port);
};

module.exports = startServer;