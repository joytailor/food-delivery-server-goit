const startServer = require('./src/server');
const connectToDb = require('./src/modules/db/connect-db');
const { port, dbUrl } = require('./config');

startServer(port);
connectToDb(dbUrl);