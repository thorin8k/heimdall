import express from 'express';
import JsonResponse from '../../common/JsonResponse.js';
import UserService from '../../service/UserService';

const asyncHandler = require('express-async-handler')

class LoginController {

    constructor() {
        this.router = express.Router();
    }

    configure() {
        this.router.use(asyncHandler((res, req, next) => { this.check(res, req, next); }));
        this.router.get('/login', asyncHandler((res, req, next) => { this.login(res, req, next); }));
        this.router.post('/login', asyncHandler((res, req, next) => { this.loginPost(res, req, next); }));
        this.router.get('/logout', asyncHandler((res, req, next) => { this.logout(res, req, next); }));
        return this.router;
    }

    async check(request, response, next) {
        const url = require('url');
        let jsRes = new JsonResponse();

        if (request.headers.authorization) {
            const b64auth = (request.headers.authorization || '').split(' ')[1] || '';
            const [login, password] = Buffer.from(b64auth, 'base64').toString('ascii').split(':');

            const uServ = new UserService();
            let data = await uServ.list({ user: login });
            let auth = data ? data[0] : {};

            if (!login || !password || login !== auth.user || password !== auth.pass) {
                jsRes.success = false;
                jsRes.status = 401;
                jsRes.message = "You shall not pass";
                response.status(401).json(jsRes.toJson());
                return;
            }
            request.session.username = login;
        }

        const publicPaths = global.settings.getConfigValue("publicPathsList");
        if (publicPaths.indexOf(url.parse(request.url).pathname) !== -1 || request.session.username) { //TODO Comprobar si es una aplicacion registrada... (Si se hace api publica)
            return next();
        }


        jsRes.success = false;
        jsRes.status = 403;
        jsRes.message = "Unauthorized";
        response.status(403).json(jsRes.toJson());
    }

    login(request, response) {
        let jsRes = new JsonResponse();
        jsRes.success = false;
        jsRes.status = 403;
        jsRes.message = "Unauthorized";
        response.status(403).json(jsRes.toJson());
    }

    async loginPost(request, response) {
        let jsRes = new JsonResponse();
        if (request.body.user) {
            const uServ = new UserService();
            try {
                let data = await uServ.list({ user: request.body.user });

                if (data.length == 0) {
                    jsRes.message = "El usuario no existe ";
                    jsRes.status = 401;
                } else if (data[0].pass === (request.body.pass)) {//utils.encrypt
                    request.session.username = request.body.user;
                    jsRes.data = {
                        user: data[0].user
                    };
                    jsRes.success = true;
                    jsRes.status = 200;
                } else {
                    jsRes.message = "La contraseña no coincide. ";
                    jsRes.status = 401;
                }

            } catch (ex) {
                console.error(ex);
                jsRes.status = 403;
                jsRes.message = "Unauthorized. " + ex;
                response.status(403).json(jsRes.toJson());
                return;
            }

            response.status(jsRes.status).json(jsRes.toJson());
        } else {
            jsRes.success = false;
            jsRes.status = 403;
            response.status(jsRes.status).json(jsRes.toJson());
        }
    }

    logout(request, response) {
        var sess = request.session;
        if (sess) {
            sess.destroy(function () {
                let jsRes = new JsonResponse();
                jsRes.success = true;
                response.json(jsRes.toJson());
            });
        }
    }
}

export { LoginController as LoginController }