import express from 'express';
import JsonResponse from '../../common/JsonResponse.js';

const asyncHandler = require('express-async-handler')


/**
 * Definicion de tablas a utilizar y sus servicios. BaseService por defecto.
 */
const entityMappings = {
    profile: {
        cls: 'BaseService',
        table: 'profile'
    },
    user: {
        cls: 'UserService',
        table: 'user'
    },
    patient: {
        cls: 'BaseService',
        table: 'patient'
    },
    document: {
        cls: 'BaseService',
        table: 'document'
    }
}



class zDynamicController {


    constructor() {
        this.router = express.Router();
    }

    configure() {
        this.router.get('/:entity/list', asyncHandler((res, req, next) => { this.listEntidad(res, req, next); }));
        this.router.get('/:entity/:id', asyncHandler((res, req, next) => { this.getEntidad(res, req, next); }));
        this.router.post('/:entity', asyncHandler((res, req, next) => { this.saveEntidad(res, req, next); }));
        this.router.post('/:entity/:id', asyncHandler((res, req, next) => { this.saveEntidad(res, req, next); }));
        this.router.post('/:entity/:id/delete', asyncHandler((res, req, next) => { this.deleteEntidad(res, req, next); }));

        return this.router;
    }

    /**
     * 
     * @param {*} type 
     */
    entityFactory(type, next) {
        const element = entityMappings[type];
        if (element) {
            let cls = require('../service/' + element.cls);
            let object =  new cls.default(element.table);
            return object;
        }

        next('Wrong path. Entity not recognized');
    }

    /**
     * Lista los entidades en la aplicacion, es posible enviarle parametros de filtrado.
     *
     * Todavia no se ha definido la lista de parametros a utilizar para el filtrado.
     *
     * @api {get} /:entidad/list List entidades
     * @apiName Listar entidades
     * @apiGroup entidad
     *
     * @apiParam {Number} id entidades unique ID.
     *
     * @apiSuccess {Boolean} success
     * @apiSuccess {Object[]} data  dataObject
     */
    async listEntidad(request, response, next) {
        if (!request.params.entity) {
            next('Wrong path. Required param entity.');
        }
        let service = this.entityFactory(request.params.entity, next);
        let filters = request.query;

        let data = await service.list(filters, request, response);
        let jsRes = new JsonResponse(true, data);

        response.json(jsRes.toJson());
    }
    /**
     *Obtiene un usuario concreto mediante su identificador
     *
     *
     * @api {get} /:entidad/:id Request entidad information
     * @apiName Obtener usuario
     * @apiGroup entidad
     *
     * @apiParam {Number} id entidades unique ID.
     *
     * @apiSuccess {Boolean} success
     * @apiSuccess {Object[]} data  dataObject
     */
    async getEntidad(request, response, next) {
        if (!request.params.entity) {
            next('Wrong path.Required param entity.');
        }
        let service = this.entityFactory(request.params.entity, next);
        let data = await service.getById(request.params.id);
        let jsRes = new JsonResponse(true, data);

        response.json(jsRes.toJson());
    }

    /**
     * Almacena un usuario,
     *
     *
     * @api {post} /:entidad/:id Create or update entidad
     * @apiName Almacenar usuario
     * @apiGroup entidad
     *
     * @apiParam {Number} id entidades unique ID.
     *
     * @apiSuccess {Boolean} success
     * @apiSuccess {Object[]} data  dataObject
     */
    async saveEntidad(request, response, next) {
        if (!request.params.entity) {
            next('Wrong path.Required param entity.');
        }
        let service = this.entityFactory(request.params.entity, next);
        let data = await service.save(request.params.id, request.body);
        let jsRes = new JsonResponse(true, { id: request.body.id || data[0] });

        response.json(jsRes.toJson());

    }

    /**
     * Elimina el usuario correspondiente al identificador recibido
     *
     *
     * @api {post} /:entidad/:id/delete Delete entidad
     * @apiName Almacenar usuario
     * @apiGroup entidad
     *
     * @apiParam {Number} id entidades unique ID.
     *
     * @apiSuccess {Boolean} success
     * @apiSuccess {Object[]} data  dataObject
     */
    async deleteEntidad(request, response, next) {
        if (!request.params.entity) {
            next('Wrong path.Required param entity.');
        }
        let service = this.entityFactory(request.params.entity, next);
        let data = await service.remove(request.params.id);
        let jsRes = new JsonResponse(true, data);

        response.json(jsRes.toJson());

    }

}

export { zDynamicController as zDynamicController };