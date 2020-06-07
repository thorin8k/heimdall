import { BaseService } from '../base';
import { Project, ProjectDao } from './';

export class ProjectService extends BaseService {
    /**
     * Constructor para la inicializacion del mainDao
     */
    constructor() {
        super('project', Project);
        this.mainDao = new ProjectDao('project', Project);
    }

}

