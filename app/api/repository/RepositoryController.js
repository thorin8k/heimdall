import express from 'express';
import { JsonResponse } from '../../common';

import { BaseController } from '../base'
import { RepositoryService, Repository } from "./";

const asyncHandler = require('express-async-handler')

export class RepositoryController extends BaseController {

    constructor() {
        super();
    }

    configure() {
        super.configure('repository', { service: RepositoryService, model: Repository, table: 'Repository' });
        return this.router;
    }

    
}
