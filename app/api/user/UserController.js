import express from 'express';
import { JsonResponse } from '../../common';

import { BaseController } from '../base'
import { UserService, User } from "./";

const asyncHandler = require('express-async-handler')

export class UserController extends BaseController {

    constructor() {
        super();
    }

    configure() {

        super.configure('user', { service: UserService, model: User, table: 'user' });

        this.router.get('/session', asyncHandler((res, req, next) => { this.getSession(res, req, next); }));

        return this.router;
    }


    /**
     *Obtiene el usuario que ha iniciado sesion
     *
     *
     * @api {get} /session Request Session information
     * @apiName Obtener usuario
     * @apiGroup User
     *
     *
     * @apiSuccess {Boolean} success
     * @apiSuccess {Object[]} data  dataObject
     * @apiSuccess {String} data.username  Nombre de usuario
     * @apiSuccess {String} data.email  Correo electronico
     * @apiSuccess {String} data.active  Estado del usuario
     */
    async getSession(request, response) {
        if (request.session.username) {
            var service = new UserService();
            let data = await service.list({ user: request.session.username }, request.query.start, request.query.limit);

            delete data[0].pass;
            let jsRes = new JsonResponse(true, data[0], "", 1);
            response.json(jsRes.toJson());
        }
    }

    
}
