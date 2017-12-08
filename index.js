
global.__base = __dirname + '/';

const express      = require('express');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose     = require('mongoose');
const morgan       = require('morgan');
const session      = require('express-session');
const url          = require("url");
const swaggerize   = require('swaggerize-express');
const path         = require('path');
const http         = require('http');
const winston      = require('winston');
const app = express();

// LOGGER
global.logger = require(__base+'/app/commons/logger');

// *** config file *** //
const config = require(__dirname+'/config');


// *** mongoose *** ///
dbOptions = {
    db: {native_parser: true},
    replset: {
        auto_reconnect: false,
        poolSize: 10,
        connectWithNoPrimary: true,
        socketOptions: {
            keepAlive: 1000,
            connectTimeoutMS: 30000
        }
    },
    server: {
        poolSize: 5,
        socketOptions: {
            keepAlive: 1000,
            connectTimeoutMS: 30000
        }
    }
};
const connect = function() {
    return mongoose.connect(config.database,dbOptions).connection;
};
connect()
.on('error', logger.error)
.on('disconnected', connect)
.once('open', function(){
    logger.info("Database Connected!!");
});


app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cookieParser());

//CORS on ExpressJS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
});

app.use('/health', function(req, res) {

    var mongo = {
        status: (mongoose.connection.readyState===1) ? 'UP' : 'DOWN'
    };
    res.status(200).send({
        status: 'UP',
        mongo: mongo
    });    
});

// SWAGGER
app.use(swaggerize({
    api: path.resolve('./config/api.yaml'),
    docspath: '/docs',
    handlers: path.resolve('./app/handlers')
}));

// server
const server = http.createServer(app);
server.listen(process.env.PORT || 3000,  function () {
    app.swagger.api.host = (process.env.SWAGGER_HOST || 'localhost') + ':' + server.address().port;
    logger.info('server listening on port ' + server.address().port);
});

module.exports = app;
