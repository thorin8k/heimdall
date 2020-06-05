import { BaseService } from '../base';
import { Job } from './';

export class JobService extends BaseService {
    /**
     * Constructor para la inicializacion del mainDao
     */
    constructor() {
        super('job', Job);
    }



}

