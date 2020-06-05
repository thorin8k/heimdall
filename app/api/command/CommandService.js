import { BaseService } from '../base';
import { Command } from './';

export class CommandService extends BaseService {
    /**
     * Constructor para la inicializacion del mainDao
     */
    constructor() {
        super('command', Command);
    }



}

