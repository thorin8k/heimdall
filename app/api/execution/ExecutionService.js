import { BaseService } from '../base';
import { Execution } from './';

export class ExecutionService extends BaseService {
    /**
     * Constructor para la inicializacion del mainDao
     */
    constructor() {
        super('execution', Execution);
    }



}

