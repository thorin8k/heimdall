import express from 'express';
import { JsonResponse } from '../../common';

import { BaseController } from '../base'
import { JobService, Job } from "./";
import { ExecutionService } from '../execution';

const asyncHandler = require('express-async-handler')

export class JobController extends BaseController {

    constructor() {
        super();
    }

    configure() {
        super.configure('job', { service: JobService, model: Job, table: 'Job' });

        this.router.get(`/job/:id/executions`, asyncHandler((res, req, next) => { this.getJobExecutions(res, req, next); }));
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
        let service = new ExecutionService();
        let data = await service.list({ job: request.params.id });
        let jsRes = new JsonResponse(true, data);

        response.json(jsRes.toJson());
    }
}
