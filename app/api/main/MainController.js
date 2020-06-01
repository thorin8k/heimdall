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
        //TODO Asyncify
        this.router.get('/', (this.index.bind(this.index)));
        this.router.get('/logs', (this.logs.bind(this.logs)));
        this.router.get('/translation', (this.translation.bind(this.translation)));
        this.router.get('/config', (this.config.bind(this.config)));
        this.router.get('/log/:log', (this.log.bind(this.log)));


        return this.router;
    }

    getRoutes() {
        return this.router;
    }

    index(request, response) {
        var filePath = path.resolve("app/statics/index.html");
        response.sendFile(filePath);
    }
    logs(request, response) {
        var filePath = path.resolve("app/statics/logs/log.html");
        response.sendFile(filePath);
    }

    translation(request, response) {
        //TODO NO ASYNC YET
        I18nLoader.load(function (err, data) {
            if (err) throw err;
            let jsRes = new JsonResponse();
            jsRes.success = true;
            jsRes.data = data;
            response.json(jsRes.toJson());
        });
    }

    config(request, response) {
        response.json(JSON.stringify(global.settings.currentSettings));
    }


    log(request, response) {
        //TODO async!
        var log = [];
        fs.readFile('logs/' + request.params.log + '.log', 'utf8', (err, data) => {
            let logData = "";

            if (err) {
                logData = ""
            } else {
                log = data.split('\n');
                log = lodash.takeRight(log, 200);
                logData = log.join('\n');
            }

            response.send(logData);
        });
    }
}