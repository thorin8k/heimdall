import express from 'express';
import { JsonResponse } from '../../common';
import { UserService } from "./";

const asyncHandler = require('express-async-handler')

export class UserController {

    constructor() {
        this.router = express.Router();
    }

    configure() {

        this.router.get('/session', asyncHandler(this.getSession.bind(this.getSession)));

        this.router.get('/profile/list', asyncHandler(this.profiles.bind(this.profiles)));

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
            let data = await service.list({ user: request.session.username }, request, response);

            delete data[0].pass;
            let jsRes = new JsonResponse(true, data[0], "", 1);
            response.json(jsRes.toJson());
        }
    }

    /**
     *Obtiene la lista de perfiles disponibles
     *
     *
     * @api {get} /profile/list Request Session information
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
    async profiles(request, response) {
        const service = new UserService();

        let data = await service.listProfiles();
        let jsRes = new JsonResponse(true, data);
        response.json(jsRes.toJson());
    }

}
