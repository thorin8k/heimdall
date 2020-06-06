import { BaseModel } from '../base';

/**
 * Los repositorios son URLS para descargarse el código fuente para las compilaciones
 * 
 */
export class Repository extends BaseModel {


    static get TYPE_GIT() { return 'git' };

    constructor(id, type, url, credentials) {
        super(id);

        this.url = url;
        this.type = type;
        this.credentials = credentials;
    }


}