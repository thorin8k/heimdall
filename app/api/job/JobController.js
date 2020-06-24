import express from 'express';
import { JsonResponse } from '../../common';

import { BaseController } from '../base'
import { JobService, Job } from "./";
import { ExecutionService } from '../execution';
import { Agent } from '../agent';

import lodash from 'lodash';

const asyncHandler = require('express-async-handler')

export class JobController extends BaseController {

    constructor() {
        super();
    }

    configure() {
        super.configure('job', { service: JobService, model: Job, table: 'Job' });

        this.router.get(`/job/:id/executions`, asyncHandler((res, req, next) => { this.getJobExecutions(res, req, next); }));
        this.router.get(`/job/:id/run`, asyncHandler((res, req, next) => { this.executeJob(res, req, next); }));
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
    async executeJob(request, response, next) {
        let service = new JobService();
        let data = await service.getById(request.params.id);

        let job = data[0];

        if (job.agents.length === 0) {
            let jsRes = new JsonResponse(false, null, 'No agents associated to job.');
            return response.json(jsRes.toJson());
        }
        if (lodash.isEmpty(global.sockets)) {
            let jsRes = new JsonResponse(false, null, 'No agents connected.');
            return response.json(jsRes.toJson());
        }
        let running = false;
        for (let agentIdx of job.agents) {
            if (global.sockets[agentIdx] && global.sockets[agentIdx].agent.status !== Agent.STATUS_OFFLINE && !global.sockets[agentIdx].agent.is_busy) {
                global.sockets[agentIdx].socket.emit('run_job', job);

                //Start listening on job messages
                global.sockets[agentIdx].socket.on('job_' + job.id, (message) => {
                    console.log(message)
                    //TODO stop on certain command
                });
                running = true;
                break;
            }
        }

        //TODO check if running. Update wherever needed.
        let jsRes = new JsonResponse(true, running);

        response.json(jsRes.toJson());
    }
}
