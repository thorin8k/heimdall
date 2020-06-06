import { BaseModel } from '../base';

/**
 * Los proyectos se definen de forma que sean conjuntos de compilaciones
 * 
 * - tendran un nombre
 * - una lista con los usuarios asiginados o un * para todos
 * - una lista con los jobs a ejecutar
 * -
 */
export class Project extends BaseModel {

    constructor(id, name, users) {
        super(id);
        this.name = name;
        this.users = users;
        
    }

    
    
}