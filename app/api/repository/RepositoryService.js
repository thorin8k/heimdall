import { BaseService } from '../base';
import { Repository } from './';

export class RepositoryService extends BaseService {
    /**
     * Constructor para la inicializacion del mainDao
     */
    constructor() {
        super('repository', Repository);
    }



}

