import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import compression from 'compression';
import cors from 'cors';
const NedbStore = require('nedb-session-store')(session);
import fileUpload from 'express-fileupload';
import url from 'url';
import JsonResponse from './common/JsonResponse.js';


import * as loadRoutes from './api'

/**
 * Clase servidor encargada de configurar las rutas.
 *
 * que el codigo se disperse entre diferentes proyectos.
 */
export default class Server {

    constructor() {

        this.app = express();

        this.config();
        this.routes();
        this.errorHandler();
    }

    /**
     * Se encarga de realizar la configuración inicial del servidor
     */
    config() {
        //Security
        this.app.use(helmet());
        //mount json form parser
        this.app.use(bodyParser.json({ limit: '100mb' }));
        //mount query string parser
        this.app.use(bodyParser.urlencoded({ extended: true }));
        //mount cookieParser
        this.app.use(cookieParser());
        // compress responses
        this.app.use(compression());
        //Enable cors to allow external references
        this.app.options('*', cors({ origin: true, credentials: true }));
        this.app.use(cors({ origin: true, credentials: true }));

        //mount session
        this.app.use(session({
            store: new NedbStore({ filename: process.cwd() + '/temp/sessionfile' }),
            secret: '-',//TODO extract from here
            // name: 'sessIdentifier',
            cookie: { expires: new Date(253402300000000) },
            resave: true,
            saveUninitialized: true
        }));


        // upload middleware
        this.app.use(fileUpload());

        //add static paths
        this.app.use('/statics', express.static("app/statics"));
        this.app.use('/', express.static("app/statics/"));

        //Logging
        this.app.use((request, response, next) => {
            request.requestTime = Date.now();
            response.on("finish", () => {
                let pathname = url.parse(request.url).pathname;
                let end = Date.now() - request.requestTime;
                if (this.withLog) {
                    console.log(moment(Date.now(), 'DD-MM-YYYY HH:mm:ss.SSS') + ' - Request[' + process.pid + ']::. ' + pathname + ' |-> took time: '+end+' ms');
                }
            });
            next();
        });
    }

    /**
     * Crea el cargador automatico de rutas
     */
    routes() {
        const router = express.Router();
        this.app.use(router);

        //create controllers
        loadRoutes(this.app)
    }


    errorHandler() {

        // error handler
        this.app.use((err, req, res, next) => {
            let jsRes = new JsonResponse();
            jsRes.success = false;
            jsRes.message = err;
            console.log(err);
            res.json(jsRes.toJson());
        });
    }
}
