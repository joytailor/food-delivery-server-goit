const https = require('https');
const fs = require('fs');
const url = require('url');
const path = require('path');
const morgan = require('morgan');
const router = require('./routes/router');
const getRouteHandler = require('./helpers/get-route-handler');
const logger = morgan('combined');

const https_options = {
  key: fs.readFileSync(path.join(__dirname, './sertificate/server.key')),
  cert: fs.readFileSync(path.join(__dirname, './sertificate/server.crt'))
};

const startServer = port => {

  const server = https.createServer(https_options, (request, response) => {

    const parsedUrl = url.parse(request.url);

    const func = getRouteHandler(router, parsedUrl.path) || router.default;

    logger(request, response, () => func(request, response));
  });

  server.listen(port);
  console.log(`Server running at https://localhost:${port}/`);
};

module.exports = startServer;