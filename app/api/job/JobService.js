import { BaseService } from '../base';
import { Job } from './';
import { JobDao } from './JobDao';

export class JobService extends BaseService {
    /**
     * Constructor para la inicializacion del mainDao
     */
    constructor() {
        super('job', Job);
        this.mainDao = new JobDao('job', Job);
    }



}

