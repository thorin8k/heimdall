import express from 'express';
import { JsonResponse } from '../../common';

import { BaseController } from '../base'
import { ExecutionService, Execution } from "./";

const asyncHandler = require('express-async-handler')

export class ExecutionController extends BaseController {

    constructor() {
        super();
    }

    configure() {
        super.configure('execution', { service: ExecutionService, model: Execution, table: 'Execution' });
        return this.router;
    }

    
}
