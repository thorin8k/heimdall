import express from 'express';
import { JsonResponse } from '../../common';

import { BaseController } from '../base'
import { ProjectService, Project } from "./";
import { JobService } from '../job';

const asyncHandler = require('express-async-handler')

export class ProjectController extends BaseController {

    constructor() {
        super();
    }

    configure() {
        
        this.router.get(`/project/:id/jobs`, asyncHandler((res, req, next) => { this.getProjectJobs(res, req, next); }));

        super.configure('project', { service: ProjectService, model: Project, table: 'Project' });

        return this.router;
    }

    /**
    * Obtiene los jobs de un proyecto mediante su identificador
    *
    *
    * @api {get} /project/:id/jobs Request project jobs
    * @apiName Obtener project jobs
    * @apiGroup project
    *
    * @apiParam {Number} id project unique ID.
    *
    * @apiSuccess {Boolean} success
    * @apiSuccess {Object[]} data  dataObject
    */
    async getProjectJobs(request, response, next) {
        let service = new JobService();
        let data = await service.list({ project: request.params.id });

        let jsRes = new JsonResponse(true, data);
        response.json(jsRes.toJson());
    }

}
