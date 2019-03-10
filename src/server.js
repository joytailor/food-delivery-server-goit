// const https = require('https');
// const fs = require('fs');
// const path = require('path');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require("body-parser");

const router = require('./routes/router');
const app = require('./modules/app');

// const https_options = {
//   key: fs.readFileSync(path.join(__dirname, './sertificate/server.key')),
//   cert: fs.readFileSync(path.join(__dirname, './sertificate/server.crt'))
// };

const errorHandler = (req, res, err) => {
  console.error(err.stack);

  res.json(500);
}

const startServer = port => {

    app
      .use(bodyParser.urlencoded({extended: false}))
      .use(bodyParser.json())
      .use(morgan("dev"))
      // .use(express.static(staticPath))
      .use("/", router)
      .use(errorHandler)

  app.listen(port);

  console.log(`Server running at http://localhost:${port}/`);
};

module.exports = startServer;