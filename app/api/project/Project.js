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

    constructor(id, name, description, icon, users) {
        super(id);
        this.name = name;
        this.description = description;
        this.icon = icon;
        this.users = users;

    }


    /**
     * Este metodo es una extension del de la clase base y sirve para "mapear" el objeto obtenido en Mongo pudiendo "aportar"
     * nuevas propiedades.
     * 
     * Como ejemplo podemos, añadir propiedades personalizadas en base a otras tablas:
     * 
     * - Un projecto y sus estadísticas de ejecución.
     */
    static fromObject(object) {
        let obj = BaseModel.fromObject(object);


        return obj;
    }


}