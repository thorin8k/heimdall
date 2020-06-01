/**
 * Based on ivsgroup nwconsole: github.com/ivsgroup/nwconsole
 *
 * Modified by Iago
 * 
 */
const moment = require('moment'),
    fs = require('fs'),
    path = require('path'),
    util = require('util'),
    winston = require('winston');

const format = winston.format;
const combine = format.combine;
const printf = format.printf;
const timestamp = format.timestamp;



export default class Logger {

    constructor() {
        const self = this;
        this.createLoggers();

        //Nota para el futuro:
        // Esto sobreescribe los metodos de console.log
        // Es necesario que la sitaxis se mantenga tal cual....
        (() => {

            const log = console.log;
            const error = console.error;
            const warn = console.warn;
            const info = console.info;
            const trace = console.trace;
            
            console.log = function () {
                let args = Array.prototype.slice.call(arguments);
                log.apply(this, args);
                self._log('log', args);
            };
            console.error = function () {
                let args = Array.prototype.slice.call(arguments);
                log.apply(this, args);
                self._err_log('error', args);
            };
            console.warn = function () {
                let args = Array.prototype.slice.call(arguments);
                log.apply(this, args);
                self._log('warn', args);
            };
            console.info = function () {
                let args = Array.prototype.slice.call(arguments);
                log.apply(this, args);
                self._log('info', args);
            };
            console.trace = function () {
                let args = Array.prototype.slice.call(arguments);
                trace.apply(this, args);
                self._log('trace', args);
            };

            console.debug = function () {
                /*if (global.settings.debug.value) {*/
                let args = Array.prototype.slice.call(arguments);
                log.apply(this, args);
                self._debug_log('debug', args);
            };

        })();
    }

    /**
     * Metodo para crear los loggers de winston para los diferentes niveles
     */
    createLoggers() {
        let myFormat = printf(function (info) {
            let date = moment(new Date(), 'DD-MM-YYYY HH:mm:ss');
            return `${date} [${info.level}]: ${info.message}`;
        });

        this.logger = winston.createLogger({
            level: 'info',
            levels: {
                error: 0,
                info: 1,
                debug: 2,
            },
            format: myFormat,
            transports: [
                new winston.transports.File({ filename: path.join(process.cwd(), 'logs/debug.log'), level: 'debug', maxsize: '1000000' }),
                new winston.transports.File({ filename: path.join(process.cwd(), 'logs/error.log'), level: 'error', maxsize: '1000000' }),
                new winston.transports.File({ filename: path.join(process.cwd(), 'logs/info.log'), maxsize: '1000000' })
            ]
        });

    }


    /**
     * Metodos para escribir el log, cada uno en un archivo
     *
     * @param level
     * @param args
     * @private
     */
    _log(level, args) {
        this.logger.log('info', args[0], args[1]);
    }
    _err_log(level, args) {
        this.logger.log('error', args[0], args[1]);
    }
    _debug_log(level, args) {
        this.logger.log('debug', args[0], args[1]);
    }

}

