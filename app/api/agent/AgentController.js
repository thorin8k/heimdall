import express from 'express';
import { JsonResponse } from '../../common';

import { BaseController } from '../base'
import { AgentService, Agent } from "./";

const asyncHandler = require('express-async-handler')

export class AgentController extends BaseController {

    constructor() {
        super();
    }

    configure() {

        let service = new AgentService();
        service.listenForAgents();

        super.configure('agent', { service: AgentService, model: Agent, table: 'Agent' });
        return this.router;
    }

    
}
