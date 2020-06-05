import express from 'express';
import { JsonResponse } from '../../common';

import { BaseController } from '../base'
import { CommandService, Command } from "./";

const asyncHandler = require('express-async-handler')

export class CommandController extends BaseController {

    constructor() {
        super();
    }

    configure() {
        super.configure('command', { service: CommandService, model: Command, table: 'Command' });
        return this.router;
    }

    
}
