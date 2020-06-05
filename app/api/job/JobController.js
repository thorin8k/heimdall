import express from 'express';
import { JsonResponse } from '../../common';

import { BaseController } from '../base'
import { JobService, Job } from "./";

const asyncHandler = require('express-async-handler')

export class JobController extends BaseController {

    constructor() {
        super();
    }

    configure() {
        super.configure('job', { service: JobService, model: Job, table: 'Job' });
        return this.router;
    }

    
}
