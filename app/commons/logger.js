
const winston = require('winston');
const rotate  = require('winston-daily-rotate-file');
const config  = require(__base+'/config').logging;


const environment = process.env.NODE_ENV || 'development';

module.exports = new winston.Logger({

    transports: [
        new winston.transports.Console({
            handleExceptions: true,
            timestamp: true,
            humanReadableUnhandledException: true,
            colorize: environment === 'development',
            level: 'info'
        })
    ],
    exitOnError: false
});
