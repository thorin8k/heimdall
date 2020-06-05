import path from 'path';
import express from 'express';
import { JsonResponse, I18nLoader } from '../../common';

import fs from 'fs';
import lodash from 'lodash';

const asyncHandler = require('express-async-handler')

export class MainController {
    constructor() {
        this.router = express.Router();
    }

    configure() {
        // this.router.get('/', asyncHandler((res, req, next) => { this.index(res, req, next); }));
        // this.router.get('/logs', asyncHandler((res, req, next) => { this.logs(res, req, next); }));
        this.router.get('/translation', asyncHandler((res, req, next) => { this.translation(res, req, next); }));
        this.router.get('/config', asyncHandler((res, req, next) => { this.config(res, req, next); }));
        this.router.get('/log/:log', asyncHandler((res, req, next) => { this.log(res, req, next); }));


        return this.router;
    }


    // index(request, response) {
    //     var filePath = path.resolve("app/statics/index.html");
    //     response.sendFile(filePath);
    // }
    // logs(request, response) {
    //     var filePath = path.resolve("app/statics/logs/log.html");
    //     response.sendFile(filePath);
    // }

    async translation(request, response) {
        const data = await I18nLoader.load();
        let jsRes = new JsonResponse(true, data);

        response.json(jsRes.toJson());
    }

    config(request, response) {
        response.json(JSON.stringify(global.settings.currentSettings));
    }


    log(request, response, next) {
        return new Promise((resolve, reject) => {
            var log = [];
            fs.readFile('logs/' + request.params.log + '.log', 'utf8', (err, data) => {
                let logData = "";

                if (err) {
                    return next('Log not found');
                }

                log = data.split('\n');
                log = lodash.takeRight(log, 200);
                logData = log.join('\n');
                response.send(logData);
                resolve();
            });
        })

    }
}