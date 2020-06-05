import express from 'express';
import { JsonResponse } from '../../common';

const asyncHandler = require('express-async-handler')


export class BaseController {


    constructor() {
        this.router = express.Router();
    }

    configure(entity, config) {
        this.router.get(`/${entity}/list`, asyncHandler((res, req, next) => { this.listEntidad(res, req, next); }));
        this.router.get(`/${entity}/:id`, asyncHandler((res, req, next) => { this.getEntidad(res, req, next); }));
        this.router.post(`/${entity}`, asyncHandler((res, req, next) => { this.saveEntidad(res, req, next); }));
        this.router.post(`/${entity}/:id`, asyncHandler((res, req, next) => { this.saveEntidad(res, req, next); }));
        this.router.delete(`/${entity}/:id`, asyncHandler((res, req, next) => { this.deleteEntidad(res, req, next); }));

        this.service = config.service;
        this.model = config.model;
        this.table = config.table;

        return this.router;
    }

    /**
     * Lista entidades en la aplicacion, es posible enviarle parametros de filtrado.
     *
     * !FIXME Todavia no se ha definido la lista de parametros a utilizar para el filtrado.
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
        let service = new this.service();
        let filters = request.query;

        let data = await service.list(filters, request.query.start, request.query.limit);
        let jsRes = new JsonResponse(true, data);

        response.json(jsRes.toJson());
    }
    /**
     *Obtiene un elemento concreto mediante su identificador
     *
     *
     * @api {get} /:entidad/:id Request entidad information
     * @apiName Obtener entidad
     * @apiGroup entidad
     *
     * @apiParam {Number} id entidades unique ID.
     *
     * @apiSuccess {Boolean} success
     * @apiSuccess {Object[]} data  dataObject
     */
    async getEntidad(request, response, next) {
        let service = new this.service();
        let data = await service.getById(request.params.id);
        let jsRes = new JsonResponse(true, data);

        response.json(jsRes.toJson());
    }

    /**
     * Almacena un elemento en BD
     *
     *
     * @api {post} /:entidad/:id Create or update entidad
     * @apiName Almacenar entidad
     * @apiGroup entidad
     *
     * @apiParam {Number} id entidades unique ID.
     *
     * @apiSuccess {Boolean} success
     * @apiSuccess {Object[]} data  dataObject
     */
    async saveEntidad(request, response, next) {
        let service = new this.service();
        let object = this.model.fromObject(request.body);

        let data = await service.save(request.params.id, object);
        let jsRes = new JsonResponse(true, { id: request.body.id || data[0] });

        response.json(jsRes.toJson());
    }

    /**
     * Elimina un elemento correspondiente al identificador recibido
     *
     *
     * @api {post} /:entidad/:id/delete Delete entidad
     * @apiName Almacenar entidad
     * @apiGroup entidad
     *
     * @apiParam {Number} id entidades unique ID.
     *
     * @apiSuccess {Boolean} success
     * @apiSuccess {Object[]} data  dataObject
     */
    async deleteEntidad(request, response, next) {
        let service = new this.service();
        let data = await service.remove(request.params.id);
        let jsRes = new JsonResponse(true, data);

        response.json(jsRes.toJson());
    }

}

