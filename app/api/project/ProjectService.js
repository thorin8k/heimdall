import { BaseService } from '../base';
import { Project, ProjectDao } from './';

import async from 'async';
import { ExecutionService } from '../execution';

export class ProjectService extends BaseService {
    /**
     * Constructor para la inicializacion del mainDao
     */
    constructor() {
        super('project', Project);
        this.mainDao = new ProjectDao('project', Project);
    }




    async loadFullSummary(filters, start, limit) {
        let projects = await this.list(filters, start, limit);


        return projects;
    }

}

