import express from 'express';
import { JsonResponse } from '../../common';

import { BaseController } from '../base'
import { ProjectService, Project } from "./";

const asyncHandler = require('express-async-handler')

export class ProjectController extends BaseController {

    constructor() {
        super();
    }

    configure() {
        super.configure('project', { service: ProjectService, model: Project, table: 'Project' });
        return this.router;
    }

    
}
