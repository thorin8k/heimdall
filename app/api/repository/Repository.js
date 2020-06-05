import { BaseModel } from '../base';

/**
 * Los repositorios son URLS para descargarse el código fuente para las compilaciones
 * 
 */
export class Repository extends BaseModel {


    constructor(id, url, credentials) {
        super(id);

        this.url = url;
        
        this.credentials = credentials;
    }


}