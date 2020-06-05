import express from 'express';
import { JsonResponse } from '../../common';
import { UserService } from './';

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
        try {
            const url = require('url');

            if (request.headers.authorization) {
                const b64auth = (request.headers.authorization || '').split(' ')[1] || '';
                const [login, password] = Buffer.from(b64auth, 'base64').toString('ascii').split(':');

                const uServ = new UserService();
                let data = await uServ.list({ user: login });
                let auth = data ? data[0] : {};

                if (!login || !password || login !== auth.user || password !== auth.pass) {
                    return response.status(401).json(new JsonResponse(false, null, 'Unauthorized').toJson());
                }
                request.session.username = login;
            }

            const publicPaths = global.settings.getConfigValue("publicPathsList");
            if (publicPaths.indexOf(url.parse(request.url).pathname) !== -1 || request.session.username) { //TODO Comprobar si es una aplicacion registrada... (Si se hace api publica)
                return next();
            }

            return response.status(403).json(new JsonResponse(false, null, 'Unauthorized').toJson());
        } catch (ex) {
            console.error(ex);
            next("Error!");
        }
    }

    login(request, response) {
        return response.status(403).json(new JsonResponse(false, null, "Unauthorized").toJson());
    }

    async loginPost(request, response) {
        if (request.body.user) {
            const uServ = new UserService();
            try {
                const user = await uServ.getByUsername( request.body.user);

                if (user != null && user.pass === (request.body.pass)) {//utils.encrypt
                    request.session.username = user.user;
                    return response.status(200).json(new JsonResponse(true, { user: user.user }).toJson());
                } else {
                    return response.status(401).json(new JsonResponse(false, null, 'Unauthorized').toJson());
                }
            } catch (ex) {
                console.error(ex);
                return response.status(403).json(new JsonResponse(false, null, "Unauthorized").toJson());
            }
        }
        return response.status(403).json(new JsonResponse(false, null, "Unauthorized").toJson());
    }

    logout(request, response) {
        var sess = request.session;
        if (sess) {
            sess.destroy(function () {
                response.status(200).json(new JsonResponse(true).toJson());
            });
        }
    }
}

export { LoginController };